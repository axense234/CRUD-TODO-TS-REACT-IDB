import React from "react";
// Components
import Logo from "../Other/Logo";
// CSS
import "../../styles/Footer/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className='footer-container'>
      <Logo />
      <small id='copyright'>
        &copy; Copyright 2022, Axense's Team.All Rights Reserved.
      </small>
    </footer>
  );
};

export default Footer;
