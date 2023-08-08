/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protectedRoute";
import NavBar from "./components/ui/navBar";
import AuthProvider from "./hooks/useAuth";
import LogOut from "./layouts/logOut";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
  return (
    <AppLoader>
      <AuthProvider>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
        </Switch>
      </AuthProvider>
      <ToastContainer />
    </AppLoader>
  );
};
export default App;
