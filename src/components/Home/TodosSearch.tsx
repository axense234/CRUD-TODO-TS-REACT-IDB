// React
import { useState } from "react";
// React Icons
import { AiOutlineSearch } from "react-icons/ai";
// Context
import { GlobalValues, useGlobalContext } from "../../context";
import { EditTodoTagOptions } from "../../data";
// CSS
import "../../styles/Home/TodosSearch.css";

const TodosSearch: React.FC = () => {
  const [tempName, setTempName] = useState<string>("");
  const [tempTag, setTempTag] = useState<string>("");
  const { getAllTodosIDB, db } = useGlobalContext() as GlobalValues;

  return (
    <form
      className='todo-search-form'
      onSubmit={(e) => {
        e.preventDefault();
        getAllTodosIDB(db, tempName, tempTag);
      }}
    >
      <div className='todo-search-name'>
        <input
          type='text'
          placeholder='ex:Random Todo'
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
        />
        <AiOutlineSearch
          onClick={() => getAllTodosIDB(db, tempName, tempTag)}
        />
      </div>
      <select
        name='tag'
        id='tag'
        value={tempTag}
        onChange={(e) => setTempTag(e.target.value)}
      >
        <option value=''>None</option>
        {EditTodoTagOptions.map((tagOption) => {
          const { id, optionName, tagColor } = tagOption;
          return (
            <option
              value={optionName}
              key={id}
              style={{ backgroundColor: tagColor }}
            >
              {optionName}
            </option>
          );
        })}
      </select>
    </form>
  );
};

export default TodosSearch;
