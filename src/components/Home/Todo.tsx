// React
import React, { useRef, useState } from "react";
// Context
import { GlobalValues, useGlobalContext } from "../../context";
// CSS
import "../../styles/Home/Todo.css";
// Components
import MenuModal from "../Modals/MenuModal";
// Hooks
import useModalTransition from "../../hooks/useModalTransition";

type TodoProps = {
  title: string;
  content: string;
  id: number | string;
};

const Todo: React.FC<TodoProps> = ({ title, content, id }) => {
  const [showText, setShowText] = useState<boolean>(false);
  const menuModalRef = useRef<HTMLDivElement | null>(null);

  const shownContent = showText ? content : content.slice(0, 300);

  const { todoModalId, setTodoModalId } = useGlobalContext() as GlobalValues;

  const handleMenuButtonClick = () => {
    if (todoModalId === id) {
      setTodoModalId(0);
    } else {
      setTodoModalId(id);
    }
  };

  const showMenuModal = todoModalId === id;

  // Transition for the Menu Modal
  useModalTransition(menuModalRef, showMenuModal);

  return (
    <article className='todo-container'>
      <MenuModal menuModalRef={menuModalRef} compId={id} />
      <button
        type='button'
        onClick={() => {
          handleMenuButtonClick();
        }}
      >
        <img
          src='https://res.cloudinary.com/birthdayreminder/image/upload/v1669999360/CRUD%20TODO%28TS%20with%20React%29/Settings_Button_dxrcay.png'
          alt='Settings Button'
        />
      </button>
      <div className='todo-title'>
        <h3>{title}</h3>
        <hr />
      </div>
      <p>{shownContent}</p>
      <button type='button' onClick={() => setShowText(!showText)}>
        {showText ? "Hide" : "Show"}
      </button>
    </article>
  );
};
export default Todo;
