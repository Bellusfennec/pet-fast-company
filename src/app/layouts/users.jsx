import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage/userEditPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserLoader from "../components/ui/hoc/userLoader";
import { getCurrentUserId } from "../store/users";

const Users = () => {
  const { location } = useHistory();
  const edit = location.pathname.includes("edit");
  const { userId } = useParams();
  const currentUserId = useSelector(getCurrentUserId());

  if (userId && edit && currentUserId !== userId) {
    return <Redirect to={`/users/${currentUserId}/edit`} />;
  }
  return (
    <UserLoader>
      {userId && edit && <UserEditPage />}
      {userId && !edit && <UserPage />}
      {!userId && <UsersListPage />}
    </UserLoader>
  );
};

export default Users;
