// React
import React, { useEffect } from "react";
// useGlobalContext
import { useGlobalContext, TodoType, GlobalValues } from "../../context";
// CSS
import "../../styles/Home/Todos.css";
// Components
import Todo from "./Todo";
import CreateTodo from "./CreateTodo";
import Loading from "../Other/Loading";

const Todos: React.FC = () => {
  const { todos, loadingHomeTodos, getAllTodosIDB, db } =
    useGlobalContext() as GlobalValues;

  useEffect(() => {
    if (db) {
      getAllTodosIDB(db, "", "");
    }
  }, [db]);

  const renderedTodos: React.ReactNode = todos?.map((todo: TodoType) => {
    const { id, title, content, tag } = todo;
    return <Todo key={id} title={title} content={content} id={id} tag={tag} />;
  });

  if (loadingHomeTodos) {
    return <Loading />;
  }

  if (todos.length === 0) {
    return (
      <section className='no-todos-list'>
        <p>Could not find any todos,try to create some!</p>
        <CreateTodo />
      </section>
    );
  }

  return (
    <section className='todos-list'>
      {renderedTodos}
      <CreateTodo />
    </section>
  );
};

export default Todos;
