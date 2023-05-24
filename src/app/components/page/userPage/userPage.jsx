/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import API from "../../../api";
import Qualities from "../../ui/qualities";

const UserPage = () => {
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
      {loading && <p>Loading...</p>}
      {!loading && user && (
        <>
          <h1>{user.name}</h1>
          <h2>Профессия: {user.profession.name}</h2>
          <Qualities qualities={user.qualities} />
          <p>completedMeetings: {user.completedMeetings}</p>
          <h2>Rate: {user.rate}</h2>
          <button onClick={() => history.push(`/users/${userId}/edit`)}>
            Изменить
          </button>
        </>
      )}
    </>
  );
};

export default UserPage;
