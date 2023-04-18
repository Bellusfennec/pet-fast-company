import React, { useEffect, useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const UsersList = ({ users, onDeleteUser, onFavorite }) => {
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const userCrop = paginate(users, currentPage, pageSize);

  useEffect(() => {
    if (users.length > pageSize && userCrop.length === 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [userCrop]);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userCrop.map((user) => (
            <User
              key={user._id}
              user={user}
              onDeleteUser={onDeleteUser}
              onFavorite={onFavorite}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};
UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired
};
export default UsersList;
