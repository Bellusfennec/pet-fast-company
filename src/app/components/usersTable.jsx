import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import BookMark from "./bookMark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UsersTable = ({
  users,
  onDeleteUser,
  onBookMark,
  onSort,
  selectedSort
}) => {
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: {
      name: "Качество",
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    profession: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <BookMark
          id={user._id}
          bookmark={user.bookmark}
          onBookMark={onBookMark}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          className="btn btn-danger"
          onClick={() => onDeleteUser(user._id)}
        >
          Delete
        </button>
      )
    }
  };

  return (
    <Table {...{ onSort, selectedSort, columns, data: users }}>
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{ columns, data: users }} />
    </Table>
  );
};
UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onBookMark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
