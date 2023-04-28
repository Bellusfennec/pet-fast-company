/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate, totalPage } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";

const UsersList = ({ users, onDeleteUser, onFavorite }) => {
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProfession, setSelectedProfession] = useState();

  const filtredUsers = selectedProfession
    ? users.filter((user) => user.profession._id === selectedProfession._id)
    : users;
  const countUsers = filtredUsers?.length ? filtredUsers.length : 0;
  const userCrop = paginate(filtredUsers, currentPage, pageSize);
  const pageCount = totalPage(countUsers, pageSize);

  useEffect(() => {
    // при удаление всех с последней страницы, переносит на предпоследнюю страницу
    if (pageCount > 0 && users?.length > pageSize && userCrop?.length === 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [userCrop]);

  useEffect(() => {
    if (userCrop?.length > 0) {
      setCurrentPage(1);
    }
  }, [selectedProfession]);

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  const handleProfessionSelect = (item) => {
    setSelectedProfession(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleResetFilter = () => {
    setSelectedProfession();
  };

  return (
    <>
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              onItemSelect={handleProfessionSelect}
              selectedItem={selectedProfession}
            />
            <button
              onClick={handleResetFilter}
              className="btn btn-secondary mt-2"
            >
              Очистить
            </button>
          </div>
        )}

        <div className="d-flex flex-column w-100">
          <h2>
            <SearchStatus length={countUsers} profession={selectedProfession} />
          </h2>
          {userCrop.length > 0 && (
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
              <div className="d-flex justify-content-center">
                <Pagination
                  itemsCount={countUsers}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired
};
export default UsersList;
