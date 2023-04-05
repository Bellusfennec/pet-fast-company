import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prev) => prev.filter((user) => user._id !== userId));
  };
  const handlePhrase = (number) => {
    if (!number) {
      return (
        <span className="badge m-2 bg-danger">Никто с тобой не тусанет</span>
      );
    }
    if (number <= 4) {
      return (
        <span className="badge m-2 bg-primary">
          {number} человека тусанет с тобой сегодняет
        </span>
      );
    }
    if (number) {
      return (
        <span className="badge m-2 bg-primary">
          {number} человек тусанет с тобой сегодня
        </span>
      );
    }
  };
  if (!users?.length) {
    return <h2>{handlePhrase(0)}</h2>;
  }
  return (
    <>
      <h2>{handlePhrase(users.length)}</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>
                {user.qualities.map((quality) => (
                  <span
                    key={quality._id}
                    className={`badge bg-${quality.color} me-2`}
                  >
                    {quality.name}
                  </span>
                ))}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}/5</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Users;
