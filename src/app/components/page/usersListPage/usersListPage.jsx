/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import Pagination from "../../common/pagination";
import { paginate, totalPage } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";

const UsersListPage = () => {
  const pageSize = 8;
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProfession, setSelectedProfession] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [users, setUsers] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    api.users
      .fetchAll()
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
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
  /* Поиск */
  const searchRegExp = new RegExp(search);
  const searchResult = users?.filter((user) =>
    searchRegExp.test(user.name.toLowerCase())
  );
  const searchUsers = searchResult?.length > 0 ? searchResult : users;
  /* Отфильтрованные по профессии */
  const filtredUsers = selectedProfession
    ? searchUsers.filter(
        (user) => user.profession._id === selectedProfession._id
      )
    : searchUsers;
  /* Колчиество */
  const countUsers = filtredUsers?.length ? filtredUsers.length : 0;
  /* Сортировка колонки */
  const sortedUsers = _.orderBy(filtredUsers, [sortBy.path], [sortBy.order]);
  /* Количество на странице */
  const userCrop = paginate(sortedUsers, currentPage, pageSize);
  /* Количество страниц */
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
    setSearch("");
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleResetFilter = () => {
    setSelectedProfession();
  };
  const handleSort = (item) => {
    setSortBy(item);
  };
  const handleSerach = ({ target }) => {
    setSearch(target.value.toLowerCase());
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
            <SearchStatus
              length={countUsers}
              profession={selectedProfession}
              loading={loading}
            />
          </h2>
          {userCrop.length > 0 && (
            <>
              <input
                value={search}
                onChange={handleSerach}
                placeholder="Serach..."
              />
              <UsersTable
                users={userCrop}
                onDeleteUser={handleDelete}
                onBookMark={handleToggleBookMark}
                onSort={handleSort}
                selectedSort={sortBy}
              />
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
export default UsersListPage;
