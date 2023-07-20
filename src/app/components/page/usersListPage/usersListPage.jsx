/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import Pagination from "../../common/pagination";
import { paginate, totalPage } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
  const pageSize = 8;
  const [loading] = useState(true);
  const { currentUser } = useAuth();
  const { isLoading: professionLoading, professions } = useProfessions();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfession, setSelectedProfession] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [search, setSearch] = useState("");
  const { users } = useUser();

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
    return filtredUsers.filter((u) => u._id !== currentUser._id);
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
