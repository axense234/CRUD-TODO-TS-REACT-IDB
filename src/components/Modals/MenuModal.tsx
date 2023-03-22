// React Router
import { Link } from "react-router-dom";
// Context
import { GlobalValues, useGlobalContext } from "../../context";
// Options for MenuModal
import { menuModalIconsURL as options } from "../../data";
// CSS
import "../../styles/Other/MenuModal.css";

type Props = {
  menuModalRef: React.MutableRefObject<HTMLDivElement | null>;
  compId: number | string;
};

const MenuModal: React.FC<Props> = ({ menuModalRef, compId }) => {
  const { setShowDeleteTodoModal } = useGlobalContext() as GlobalValues;

  const renderedOptions = options.map((option) => {
    // DeleteTodoModal
    if (option.destination === "DeleteTodoModal") {
      return (
        <Link
          to='/'
          type='button'
          key={option.id}
          onClick={() => setShowDeleteTodoModal(true)}
          state={compId}
        >
          <h3>{option.textContent}</h3>
          <img src={option.iconURL} alt={option.textContent} />
        </Link>
      );
    }
    return (
      <Link to={option.destination} key={option.id} state={compId}>
        <h3>{option.textContent}</h3>
        <img src={option.iconURL} alt={option.textContent} />
      </Link>
    );
  });

  return (
    <div className='menu-modal' ref={menuModalRef}>
      {renderedOptions}
    </div>
  );
};

export default MenuModal;
