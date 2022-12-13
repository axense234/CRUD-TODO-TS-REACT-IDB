import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to='/' className='logo'>
      <img
        src='https://res.cloudinary.com/birthdayreminder/image/upload/v1669711350/CRUD%20TODO%28TS%20with%20React%29/Logo.png_klc5na.png'
        alt='Nav Logo'
      />
    </Link>
  );
};

export default Logo;
