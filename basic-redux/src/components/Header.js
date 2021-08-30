import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import classes from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
  };

  const menu = (
    <ul>
      <li>
        <a href="/">My Products</a>
      </li>
      <li>
        <a href="/">My Sales</a>
      </li>
      <li>
        <button onClick={logoutHandler}>Logout</button>
      </li>
    </ul>
  );

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>{isAuth && menu}</nav>
    </header>
  );
};

export default Header;
