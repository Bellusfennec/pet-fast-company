import React from "react";
import UsersListPage from "../components/page/usersListPage";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import UserPage from "../components/page/userPage";
const Users = () => {
  const { userId } = useParams();
  return <>{userId ? <UserPage /> : <UsersListPage />}</>;
};

export default Users;
