// CSS
import "../styles/Home/Home.css";
import { useLocation } from "react-router-dom";
// Components
import Todos from "../components/Home/Todos";
import DeleteTodoModal from "../components/Modals/DeleteTodoModal";
// Context
import { GlobalValues, useGlobalContext } from "../context";
// Hooks
import useModalTransition from "../hooks/useModalTransition";

const Home: React.FC = () => {
  const { showDeleteTodoModal, deleteTodoModalRef } =
    useGlobalContext() as GlobalValues;

  const { state: id } = useLocation();

  useModalTransition(deleteTodoModalRef, showDeleteTodoModal);

  return (
    <main className='home-page-container'>
      <DeleteTodoModal show={showDeleteTodoModal} id={id} />
      <section className='home-page-first-section'>
        <article className='home-page-first-section-first-part'>
          <header className='home-page-first-section-title'>
            <h1 className='title'>CRUD TODO</h1>
            <hr />
          </header>
          <p className='home-page-first-section-text'>
            Create,Read,Update,Delete TODO’S with ease.
            <br />
            Project created with Typescript and React.
          </p>
        </article>
        <img
          src='https://res.cloudinary.com/birthdayreminder/image/upload/v1669710519/CRUD%20TODO%28TS%20with%20React%29/Completed_task__Isometric_d9rxxx.png'
          alt='Home'
          width='500px'
          height='500px'
        />
      </section>
      <section className='home-page-second-section'>
        <header className='home-page-second-section-title'>
          <h2 className='title'>TODO'S</h2>
          <hr />
        </header>
        <Todos />
      </section>
    </main>
  );
};

export default Home;
