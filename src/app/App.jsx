/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import api from "./api";
import UsersList from "./components/usersList";

const App = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    setUsers((prev) => prev.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    setUsers((prevState) =>
      prevState.map((item) =>
        item._id === id ? { ...item, bookmark: !item.bookmark } : item
      )
    );
  };
  return (
    <>
      {users && (
        <UsersList
          users={users}
          onDeleteUser={handleDelete}
          onFavorite={handleToggleBookMark}
        />
      )}
    </>
  );
};
export default App;
