import React from "react";
import api from "../api";

const Users = () => {
  console.log(api.users.fetchAll());
  return <>hello</>;
};
export default Users;
