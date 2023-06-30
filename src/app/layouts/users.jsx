import React from "react";
import UsersListPage from "../components/page/usersListPage";
import { useHistory, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UserEditPage from "../components/page/userEditPage/userEditPage";
import UserProvider from "../hooks/useUsers";
const Users = () => {
  const { location } = useHistory();
  const edit = location.pathname.includes("edit");
  const { userId } = useParams();
  return (
    <UserProvider>
      {userId && edit && <UserEditPage />}
      {userId && !edit && <UserPage />}
      {!userId && <UsersListPage />}
    </UserProvider>
  );
};

export default Users;
