import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
    history.push("/");
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">Inicio</Link>
      </div>
      <nav>
        <ul>
          {isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/perfil">
                Perfil
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Salir</button>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/registro">
                Registro
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/login">
                Iniciar Sesión
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
