// React Router
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to='/' className='logo'>
      <img
        sizes='75px, 150px'
        srcSet='https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,q_80,w_75/v1669711350/CRUD%20TODO(TS%20with%20React)/Logo.png_klc5na.png, https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,q_80,w_150/v1669711350/CRUD%20TODO(TS%20with%20React)/Logo.png_klc5na.png, '
        alt='Nav Logo'
      />
    </Link>
  );
};

export default Logo;
