import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookMark";
import PropTypes from "prop-types";

const User = ({ user, onDeleteUser, onFavorite }) => {
  return (
    <tr>
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
User.propTypes = {
  user: PropTypes.object.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired
};

export default User;
