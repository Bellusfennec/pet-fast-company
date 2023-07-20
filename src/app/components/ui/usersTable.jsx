import React from "react";
import PropTypes from "prop-types";
import Table, { TableHeader, TableBody } from "../common/table";
import BookMark from "../common/bookMark";
import QualitiesList from "./qualities";
import { Link } from "react-router-dom";
import Profession from "./profession";

const UsersTable = ({ users, onBookMark, onSort, selectedSort }) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: "Качество",
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    profession: {
      name: "Профессия",
      component: (user) => <Profession id={user.profession} />
    },
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
  onBookMark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
