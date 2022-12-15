// CSS
import "../../styles/Other/TemplatePage.css";
// React
import React, { useEffect, useState } from "react";
// Nanoid
import { nanoid } from "nanoid";
// React Router
import { useLocation } from "react-router-dom";
// Context
import { GlobalValues, TodoType, useGlobalContext } from "../../context";
// Data
import { EditTodoTagOptions } from "../../data";

interface PageProps {
  title: string;
  search: boolean;
  type: string;
}

const TemplatePage: React.FC<PageProps> = ({ title, search, type }) => {
  const { getTodoIDB, db } = useGlobalContext() as GlobalValues;
  const { state: id } = useLocation();

  const [tempTodo, setTempTodo] = useState<TodoType>({
    title: "",
    content: "",
    id: id || "",
    tag: "UNFINISHED",
  });

  useEffect(() => {
    if (db) {
      getTodoIDB(tempTodo.id as string).then((res) => {
        if (res) {
          setTempTodo(res as TodoType);
        }
      });
    }
  }, [tempTodo.id, db]);

  const renderedContent = useRenderedContent(type, tempTodo, setTempTodo);

  return (
    <main className='template-page-container'>
      <header className='template-page-title'>
        <h1>{title}</h1>
        <hr />
      </header>
      {search ? (
        <form
          className='template-page-search'
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor='id-input'>ID: </label>
          <input
            type='text'
            id='id-input'
            value={tempTodo.id}
            onChange={(e) => setTempTodo({ ...tempTodo, id: e.target.value })}
          />
        </form>
      ) : null}
      <section className='template-page-content'>{renderedContent}</section>
    </main>
  );
};

const useRenderedContent = (
  type: string,
  tempTodo: TodoType,
  setTempTodo: React.Dispatch<React.SetStateAction<TodoType>>
) => {
  let templatePageContent;

  const { addTodoIDB, editTodoIDB } = useGlobalContext() as GlobalValues;

  switch (type) {
    case "about":
      templatePageContent = (
        <p className='about-us-p'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis
          ultricies libero, eu gravida libero lacinia non. Pellentesque et ex
          metus. Duis nec aliquet leo. Nunc neque risus, tempor at.
        </p>
      );
      break;
    case "view":
      {
        const todoTagColor =
          tempTodo.tag === "FINISHED"
            ? "green"
            : tempTodo.tag === "ABANDONED"
            ? "purple"
            : "red";
        templatePageContent = (
          <ul className='view-page-content'>
            <li>
              <h2>TODO Name: {tempTodo.title}</h2>
              <h3>
                TODO Tag:{" "}
                <span
                  id='todo-tag'
                  style={{ backgroundColor: todoTagColor || "red" }}
                >
                  {tempTodo.tag}
                </span>
              </h3>
            </li>
            <li>
              <p>
                TODO Content:{" "}
                {tempTodo.content.length >= 300
                  ? ` ${tempTodo.content.slice(0, 300)}...`
                  : tempTodo.content}
              </p>
            </li>
          </ul>
        );
      }
      break;
    case "create":
      templatePageContent = (
        <form
          className='todo-settings-form'
          onSubmit={(e) => {
            e.preventDefault();
            addTodoIDB({
              id: nanoid(),
              title: tempTodo.title,
              content: tempTodo.content,
              tag: "UNFINISHED",
            });
          }}
        >
          <div>
            <label htmlFor='title'>TODO Name:</label>
            <input
              type='text'
              id='title'
              value={tempTodo.title}
              onChange={(e) => {
                setTempTodo({ ...tempTodo, title: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <label htmlFor='content'>TODO Content:</label>
            <input
              type='text'
              id='content'
              value={tempTodo.content}
              onChange={(e) => {
                setTempTodo({
                  ...tempTodo,
                  content: e.target.value,
                });
              }}
              required
            />
          </div>
          <button type='submit'>Submit</button>
        </form>
      );
      break;
    case "edit":
      templatePageContent = (
        <form
          className='todo-settings-form'
          onSubmit={(e) => {
            e.preventDefault();
            editTodoIDB(tempTodo);
          }}
        >
          <div>
            <label htmlFor='title'>TODO Name:</label>
            <input
              type='text'
              id='title'
              value={tempTodo.title}
              onChange={(e) => {
                setTempTodo({ ...tempTodo, title: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <label htmlFor='tag'>TODO Tag:</label>
            <select
              name='tag'
              id='tag'
              value={tempTodo.tag}
              onChange={(e) =>
                setTempTodo({
                  ...tempTodo,
                  tag: e.target.value as
                    | "UNFINISHED"
                    | "FINISHED"
                    | "ABANDONED",
                })
              }
            >
              {EditTodoTagOptions.map((tagOption) => {
                const { id, optionName, tagColor } = tagOption;
                return (
                  <option
                    key={id}
                    value={optionName}
                    style={{ backgroundColor: tagColor }}
                  >
                    {optionName}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor='content'>TODO Content:</label>
            <input
              type='text'
              id='content'
              value={tempTodo.content}
              onChange={(e) => {
                setTempTodo({ ...tempTodo, content: e.target.value });
              }}
              required
            />
          </div>
          <button type='submit'>Edit</button>
        </form>
      );
      break;
    default:
      break;
  }

  return templatePageContent;
};

export default TemplatePage;
