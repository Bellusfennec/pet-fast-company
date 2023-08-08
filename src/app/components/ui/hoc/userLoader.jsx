import { useDispatch, useSelector } from "react-redux";
import { getUsersLoaded, loadUsersList } from "../../../store/users";
import React, { useEffect } from "react";
import PropTypes from "prop-types";

const UserLoader = ({ children }) => {
  const usersIsLoaded = useSelector(getUsersLoaded());
  const dispatch = useDispatch();

  useEffect(() => {
    if (!usersIsLoaded) dispatch(loadUsersList());
  }, []);

  if (!usersIsLoaded) return <p>Loading</p>;

  return children;
};
UserLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default UserLoader;
