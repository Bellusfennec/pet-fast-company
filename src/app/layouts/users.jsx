import React from "react";
import UsersListPage from "../components/page/usersListPage";
import { useHistory, useParams, Redirect } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UserEditPage from "../components/page/userEditPage/userEditPage";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";

const Users = () => {
  const { location } = useHistory();
  const edit = location.pathname.includes("edit");
  const { userId } = useParams();
  const { currentUser } = useAuth();

  if (userId && edit && currentUser._id !== userId) {
    return <Redirect to={`/users/${currentUser._id}/edit`} />;
  }
  return (
    <UserProvider>
      {userId && edit && <UserEditPage />}
      {userId && !edit && <UserPage />}
      {!userId && <UsersListPage />}
    </UserProvider>
  );
};

export default Users;
