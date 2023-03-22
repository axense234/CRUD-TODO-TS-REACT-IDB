// React Router
import { Outlet } from "react-router-dom";
// Components
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const SharedLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <>
        <Outlet />
      </>
      <Footer />
    </>
  );
};

export default SharedLayout;
