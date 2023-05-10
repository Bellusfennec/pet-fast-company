/* eslint-disable no-unused-vars */
import React from "react";
import UsersList from "./components/usersList";
import { Switch, Route } from "react-router-dom";
import Main from "./layouts/main";
import Users from "./layouts/users";
import Login from "./layouts/login";
import NavBar from "./components/navBar";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
      </Switch>
      <NavBar />
      <UsersList />
    </>
  );
};
export default App;
