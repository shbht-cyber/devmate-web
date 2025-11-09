import { Outlet } from "react-router-dom";

import NavBar from "./common/NavBar";
import Footer from "./common/Footer";

const Body = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
