/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import API from "../api";
import QualitiesList from "./qualitiesList";

const User = () => {
  const history = useHistory();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    setLoading(true);
    API.users
      .getById(userId)
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {" "}
      {!loading ? (
        <>
          <h1>{user.name}</h1>
          <h2>Профессия: {user.profession.name}</h2>
          <QualitiesList qualities={user.qualities} />
          <p>completedMeetings: {user.completedMeetings}</p>
          <h2>Rate: {user.rate}</h2>
          <button onClick={() => history.push("/users")}>
            Все пользователи
          </button>
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default User;
