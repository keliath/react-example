import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { authActions } from "./store/auth-slice";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.getToken());
  }, [dispatch]);

  return (
    <Fragment>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          {isLoggedIn && (
            <Route path="/perfil" exact>
              <ProfilePage />
            </Route>
          )}
          {!isLoggedIn && (
            <Route path="/login">
              <AuthPage />
            </Route>
          )}
          {!isLoggedIn && (
            <Route path="/registro">
              <AuthPage />
            </Route>
          )}
        </Switch>
      </Layout>
    </Fragment>
  );
}

export default App;
