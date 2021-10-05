import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setMenuToggle, setIsLoggedIn } from "../../actions";
import "./Header.css";
import Matrix from "../../assets/images/Matrix.png";

const Header = () => {
  const dispatch = useDispatch();
  let localStorageUser = useSelector((state) => state.localStorageUser);
  let isLoggedIn = useSelector((state) => state.isLoggedIn);

  const handleMenuClick = () => {
    dispatch(setMenuToggle());
  };

  const handleLogout = () => {
    localStorage.removeItem("localStorageUser");
    dispatch(setIsLoggedIn(false));
  };

  return (
    <div>
      <ToastContainer
        className="col-10 col-sm-3 ms-3 ms-s mt-3"
        position="top-center"
      />
      <nav className="navbar pb-0 bg-light shadow-sm px-5 border-bottom">
        <div className="d-flex align-items-center">
          <div
            className="menu"
            onClick={handleMenuClick}
            title="Products Details Container Toggle"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="display-6 ms-3 pt-2">Youtube</p>
          <p className="display-6 ms-2 fs-6 pt-3">By David Saal</p>
        </div>
        <div className="d-flex gap-3">
          {isLoggedIn && (
            <div className="d-flex align-items-center gap-3">
              <p className="display-6 ms-2 fs-6 pt-4">
                Hello, {localStorageUser.email}
              </p>
              <button className="btn mt-1 border" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
          <img className="pb-1" src={Matrix} alt="Youtube" />
        </div>
      </nav>
    </div>
  );
};

export default Header;
