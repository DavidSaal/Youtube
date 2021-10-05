import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import AddCategoryContainer from "../../containers/AddCategoryContainer";
import CategoriesContainer from "../../containers/CategoriesContainer";
import ModalsContainer from "../../containers/ModalsContainer";
import AuthScreen from "../../components/AuthScreen";
import "./Homepage.css";

const Homepage = () => {
  let menuToggle = useSelector((state) => state.menuToggle);
  let isLoggedIn = useSelector((state) => state.isLoggedIn);
  let localStorageUser = useSelector((state) => state.localStorageUser);

  return (
    <div>
      <ModalsContainer />
      <Header />
      {isLoggedIn && menuToggle && <AddCategoryContainer />}
      <Router basename={process.env.PUBLIC_URL}>
        <Route
          exact
          path="/"
          render={() =>
            isLoggedIn ? (
              <CategoriesContainer key={localStorageUser.email} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/login"
          render={() => (isLoggedIn ? <Redirect to="/" /> : <AuthScreen />)}
        />
      </Router>
    </div>
  );
};

export default Homepage;
