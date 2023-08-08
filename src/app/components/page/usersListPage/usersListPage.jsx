/* eslint-disable indent */
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getProfessions,
  getProfessionsIsLoading
} from "../../../store/professions";
import { getCurrentUserId, getUsers } from "../../../store/users";
import { paginate, totalPage } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";

const UsersListPage = () => {
  const pageSize = 8;
  const [loading] = useState(true);
  const currentUserId = useSelector(getCurrentUserId());
  const professions = useSelector(getProfessions());
  const professionLoading = useSelector(getProfessionsIsLoading());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfession, setSelectedProfession] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [search, setSearch] = useState("");
  const users = useSelector(getUsers());

  const handleToggleBookMark = (id) => {
    // setUsers((prevState) =>
    //   prevState.map((item) =>
    //     item._id === id ? { ...item, bookmark: !item.bookmark } : item
    //   )
    // );
    console.log(id);
  };
  /* Поиск */
  const searchRegExp = new RegExp(search);
  const searchResult = users?.filter((user) =>
    searchRegExp.test(user.name.toLowerCase())
  );
  /* Отфильтрованные по профессии */
  const filtredUsers = filterUsers(searchResult);
  /* Колчиество */
  const countUsers = filtredUsers?.length ? filtredUsers.length : 0;
  /* Сортировка колонки */
  const sortedUsers = _.orderBy(filtredUsers, [sortBy.path], [sortBy.order]);
  /* Количество на странице */
  const userCrop = paginate(sortedUsers, currentPage, pageSize);
  /* Количество страниц */
  const pageCount = totalPage(countUsers, pageSize);

  function filterUsers(data) {
    const filtredUsers = selectedProfession
      ? searchResult.filter(
          (user) => user.profession._id === selectedProfession._id
        )
      : searchResult;
    return filtredUsers.filter((u) => u._id !== currentUserId);
  }

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
        {professions && !professionLoading && (
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
          {users && (
            <input
              value={search}
              onChange={handleSerach}
              placeholder="Serach..."
            />
          )}
          {search && userCrop.length === 0 && (
            <h5 className="mt-4">Не найдено</h5>
          )}
          {userCrop.length > 0 && (
            <>
              <UsersTable
                users={userCrop}
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
