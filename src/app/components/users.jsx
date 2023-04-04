import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prev) => prev.filter((user) => user._id !== userId));
  };
  const handlePhrase = (number) => {
    let text;
    let classes = "badge m-2";
    if (number) {
      const humans = number <= 4 ? "человека" : "человек";
      classes += " bg-primary";
      text = `${number} ${humans} тусанет с тобой сегодня`;
    } else {
      classes += " bg-danger";
      text = "Никто с тобой не тусанет";
    }
    return <span className={classes}>{text}</span>;
  };

  return (
    <>
      <h2>{handlePhrase(users.length)}</h2>
      {users.length ? (
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
            {users &&
              users.map((user) => (
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
      ) : (
        ""
      )}
    </>
  );
};
export default Users;
