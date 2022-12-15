import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
// IDB
import { openDB, DBSchema, IDBPDatabase } from "idb";
import { useNavigate } from "react-router-dom";

// Typescript stuff
export interface TodoType {
  id: string | number;
  title: string;
  content: string;
  tag: "FINISHED" | "UNFINISHED" | "ABANDONED";
}

export type TodoList = TodoType[];

interface MyDB extends DBSchema {
  todos: {
    value: TodoType;
    key: string;
  };
}

export type GlobalValues = {
  todos: TodoList;
  setTodos: React.Dispatch<React.SetStateAction<TodoList>>;
  todoModalId: number | string;
  setTodoModalId: React.Dispatch<React.SetStateAction<number | string>>;
  showDeleteTodoModal: boolean;
  setShowDeleteTodoModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteTodoModalRef: React.MutableRefObject<HTMLDivElement | null>;
  addTodoIDB: ({ id, title, content }: TodoType) => Promise<void>;
  getAllTodosIDB: (
    dbArg: IDBPDatabase<MyDB> | null,
    filterName: string,
    filterTag: string
  ) => Promise<void>;
  loadingHomeTodos: boolean;
  db: IDBPDatabase<MyDB> | null;
  getTodoIDB: (id: string) => Promise<TodoType | null>;
  editTodoIDB: (todo: TodoType) => Promise<void>;
  deleteTodoIDB: (id: string) => Promise<void>;
  navDropdownRef: React.MutableRefObject<HTMLElement | null>;
  showNavDropdown: boolean;
  setShowNavDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

// Context
const AppContext = createContext<GlobalValues | null>(null);

// CONSTANTS and others
const DB_NAME = "Todos";
const DB_VERSION = 1;
const STORE_NAME = "todos";

// Provider
const AppProvider: React.FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const [todos, setTodos] = useState<TodoList>([]);
  const [todoModalId, setTodoModalId] = useState<number | string>(0);
  const [showDeleteTodoModal, setShowDeleteTodoModal] =
    useState<boolean>(false);
  const deleteTodoModalRef = useRef<HTMLDivElement | null>(null);
  const navDropdownRef = useRef<HTMLElement | null>(null);
  const [showNavDropdown, setShowNavDropdown] = useState<boolean>(false);
  const [db, setDb] = useState<IDBPDatabase<MyDB> | null>(null);
  const [loadingHomeTodos, setLoadingHomeTodos] = useState<boolean>(true);

  const navigate = useNavigate();

  console.count("render: ");

  // Inititalize
  useEffect(() => {
    (async () => {
      const database = await openDB<MyDB>(DB_NAME, DB_VERSION, {
        upgrade(upgradeDB) {
          console.log("upgrade");
          upgradeDB.createObjectStore(STORE_NAME, {
            keyPath: "id",
          });
        },
      });
      setDb(database);
    })();
  }, []);

  // GET ALL DB ITEMS
  const getAllTodosIDB = async (
    dbArg: IDBPDatabase<MyDB> | null,
    filterName: string,
    filterTag: string
  ) => {
    const todosReceived = await dbArg?.getAll(STORE_NAME);
    if (todosReceived) {
      const filteredTodos = todosReceived.filter((todo: TodoType) => {
        const { title, tag } = todo;
        return (
          title.includes(filterName) && (tag === filterTag || filterTag === "")
        );
      });
      setTodos(filteredTodos);
      setLoadingHomeTodos(false);
    } else {
      setTodos([]);
    }
  };

  // ADD ITEM TO IDB
  const addTodoIDB = async ({ id, title, content, tag }: TodoType) => {
    await db?.put(STORE_NAME, {
      id,
      title,
      content,
      tag,
    });
    navigate("view", { state: id });
  };

  // GET SINGLE ITEM FROM IDB
  const getTodoIDB = async (id: string) => {
    const todoFound = await db?.get(STORE_NAME, id);
    if (todoFound) {
      return todoFound;
    }
    return null;
  };

  // EDIT ITEM FROM IDB
  const editTodoIDB = async (todo: TodoType) => {
    await db?.put(STORE_NAME, todo);
    navigate("view", { state: todo.id });
  };

  // DELETE ITEM FROM IDB
  const deleteTodoIDB = async (id: string) => {
    await db?.delete(STORE_NAME, id);
    getAllTodosIDB(db, "", "");
  };

  return (
    <AppContext.Provider
      value={{
        todos,
        setTodos,
        todoModalId,
        setTodoModalId,
        showDeleteTodoModal,
        setShowDeleteTodoModal,
        deleteTodoModalRef,
        addTodoIDB,
        getAllTodosIDB,
        loadingHomeTodos,
        db,
        getTodoIDB,
        editTodoIDB,
        deleteTodoIDB,
        navDropdownRef,
        showNavDropdown,
        setShowNavDropdown,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
