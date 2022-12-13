// React
import { useEffect } from "react";
// React Router
import { Link } from "react-router-dom";
// Components
import NavMenu from "./NavMenu";
// CSS
import "../../styles/Navbar/NavDropdown.css";
// Context
import { GlobalValues, useGlobalContext } from "../../context";
// DATA
import { NavLinksInfo } from "../../data";

const NavDropdown: React.FC = () => {
  const { navDropdownRef, showNavDropdown, setShowNavDropdown } =
    useGlobalContext() as GlobalValues;

  useEffect(() => {
    const dropdownRef = navDropdownRef?.current?.style as CSSStyleDeclaration;
    let timeout: any;
    if (showNavDropdown) {
      dropdownRef.display = "flex";
      timeout = setTimeout(() => {
        dropdownRef.transform = "scale(1)";
      }, 100);
    } else {
      dropdownRef.transform = "scale(0)";
      timeout = setTimeout(() => {
        dropdownRef.display = "none";
      }, 100);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showNavDropdown]);

  return (
    <section className='nav-dropdown' ref={navDropdownRef}>
      <NavMenu />
      <div className='nav-dropdown-links'>
        {NavLinksInfo.map(({ destination, textContent, id }) => {
          return (
            <Link
              key={id}
              to={destination}
              onClick={() => setShowNavDropdown(false)}
            >
              {textContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default NavDropdown;
