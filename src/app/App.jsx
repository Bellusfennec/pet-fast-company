/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";

const App = () => {
  return (
    <>
      <NavBar />
      <QualitiesProvider>
        <ProfessionProvider>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/users/:userId?/:edit?" component={Users} />
          </Switch>
        </ProfessionProvider>
      </QualitiesProvider>
      <ToastContainer />
    </>
  );
};
export default App;
