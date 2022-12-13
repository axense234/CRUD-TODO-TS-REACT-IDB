// React
import { useEffect, useState } from "react";
// Context
import { GlobalValues, useGlobalContext } from "../../context";
// CSS
import "../../styles/Other/DeleteTodoModal.css";

type Props = {
  show: boolean;
  id: string;
};

const DeleteTodoModal: React.FC<Props> = ({ show, id }) => {
  const { setShowDeleteTodoModal, deleteTodoModalRef, deleteTodoIDB } =
    useGlobalContext() as GlobalValues;

  const { count } = useCountdown(10, show);

  const handleTodoDeletion = () => {
    // Delete with IndexedDB func coming from context
    deleteTodoIDB(id);
    setShowDeleteTodoModal(false);
  };

  const enableTodoDeletion = count > 0;

  return (
    <div className='delete-todo-modal-container' ref={deleteTodoModalRef}>
      <article className='delete-todo-modal-popup'>
        <h3>Are you really sure you want to delete the todo?</h3>
        <div className='delete-todo-modal-buttons'>
          <button
            type='button'
            disabled={enableTodoDeletion}
            onClick={() => handleTodoDeletion()}
          >
            {enableTodoDeletion ? count : "Yes"}
          </button>
          <button type='button' onClick={() => setShowDeleteTodoModal(false)}>
            No
          </button>
        </div>
      </article>
    </div>
  );
};

const useCountdown = (time: number, show: boolean) => {
  const [count, setCount] = useState<number>(time);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (!show) {
      setCount(time);
    } else if (show && count > 0) {
      interval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }
    return () => {
      return clearInterval(interval);
    };
  }, [show]);

  return { count };
};

export default DeleteTodoModal;
