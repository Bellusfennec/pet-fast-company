/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import api from "./api";
import UsersList from "./components/usersList";
import SearchStatus from "./components/searchStatus";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

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

  if (!users?.length) {
    return (
      <h2>
        <SearchStatus length="0" />
      </h2>
    );
  }
  return (
    <>
      <h2>
        <SearchStatus length={users.length} />
      </h2>
      <UsersList
        users={users}
        onDeleteUser={handleDelete}
        onFavorite={handleToggleBookMark}
      />
    </>
  );
};
export default App;
