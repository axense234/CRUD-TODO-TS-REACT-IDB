// React Router
import { Link } from "react-router-dom";
// React
import React from "react";
// CSS
import "../../styles/Home/Todos.css";

const CreateTodo: React.FC = () => {
  return (
    <Link to='/create' className='create-todo-item'>
      <img
        src='https://res.cloudinary.com/birthdayreminder/image/upload/v1670001273/CRUD%20TODO%28TS%20with%20React%29/Create_TODO_Icon.png_pbpaw6.png'
        alt='Create Todo Button'
      />
    </Link>
  );
};

export default CreateTodo;
