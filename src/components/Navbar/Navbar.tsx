// React Router
import { Link } from "react-router-dom";
// CSS
import "../../styles/Navbar/Navbar.css";
// Components
import Logo from "../Other/Logo";
import NavDropdown from "./NavDropdown";
import NavMenu from "./NavMenu";
// Data
import { NavLinksInfo } from "../../data";

const Navbar: React.FC = () => {
  return (
    <nav className='nav-container'>
      <Logo />
      <NavMenu />
      <NavDropdown />
      <div className='nav-links'>
        {NavLinksInfo.map(({ destination, textContent, id }) => {
          return (
            <Link key={id} to={destination}>
              {textContent}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
