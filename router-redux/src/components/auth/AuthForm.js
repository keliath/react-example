import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const location = useLocation();
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const enteredEmail = useRef("");
  const enteredPassword = useRef("");

  const dispatch = useDispatch();

  // const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    const pathLocation = location.pathname.split("/")[1];

    if (pathLocation === "login") {
      setIsLogin(true);
      enteredEmail.current.value = "";
      enteredPassword.current.value = "";
    } else {
      setIsLogin(false);
      enteredEmail.current.value = "";
      enteredPassword.current.value = "";
    }
  }, [location]);

  const submitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);

    const email = enteredEmail.current.value;
    const password = enteredPassword.current.value;

    if (isLogin) {
      fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            //mensaje de error
            throw new Error("Usuario o contrasena incorrecta");
          }
          return response.json();
        })
        .then((data) => {
          return data.token;
        })
        .then((token) => {
          console.log(token);
          dispatch(authActions.login(token));
          history.push("/");
        })
        .catch((err) => console.error(err));
    } else {
      fetch("http://localhost:8080/auth/signup", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          history.push("/login");
        })
        .catch((err) => console.error(err));
    }

    setIsLoading(false);
  };

  const changeFormHandler = (event) => {
    event.preventDefault();

    if (isLogin) {
      history.push("/registro");
    } else {
      history.push("/login");
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Inicio de sesion" : "Registro"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={enteredEmail} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" ref={enteredPassword} required />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? "Login" : "Crear Cuenta"}</button>}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={changeFormHandler}
          >
            {isLogin ? "Crear una nueva cuenta" : "Iniciar sesion"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
