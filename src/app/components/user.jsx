import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({ user, onDeleteUser, onFavorite }) => {
  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((quality) => (
          <Qualitie key={quality._id} {...quality} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td>
        <BookMark
          id={user._id}
          bookmark={user.bookmark}
          onFavorite={onFavorite}
        />
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => onDeleteUser(user._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
