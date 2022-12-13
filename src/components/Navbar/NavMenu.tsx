// CSS
import "../../styles/Navbar/NavMenu.css";
// Context
import { GlobalValues, useGlobalContext } from "../../context";

const NavMenu: React.FC = () => {
  const { setShowNavDropdown, showNavDropdown } =
    useGlobalContext() as GlobalValues;

  return (
    <button
      type='button'
      className='nav-menu'
      onClick={() => setShowNavDropdown(!showNavDropdown)}
    >
      <img
        src='https://res.cloudinary.com/birthdayreminder/image/upload/v1665846369/Savage%20Meal/menu_uhouq7.webp'
        alt='Menu'
      />
    </button>
  );
};

export default NavMenu;
