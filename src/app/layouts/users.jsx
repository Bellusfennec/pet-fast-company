import React from "react";
import UsersList from "../components/usersList";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import User from "../components/user";

const Users = () => {
  const { userId } = useParams();
  return <>{userId ? <User /> : <UsersList />}</>;
};

export default Users;
