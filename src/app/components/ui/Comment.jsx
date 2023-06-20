import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../api";

const Comment = ({ comment, onRemove }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  console.log("comm");

  const date = (ms) => {
    let result;
    const now = new Date();
    const date = new Date(Number(ms));
    const diff = now - date;
    // const min = new Date(diff).getMinutes();
    const minut = Math.floor(diff / (1000 * 60));
    const hour = Math.floor(diff / (1000 * 60 * 60));
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    console.log(
      "diff",
      new Date(diff),
      new Date(diff).getSeconds(),
      new Date(diff).getMinutes(),
      new Date(diff).getHours()
    );

    console.log("s", diff / 1000);
    console.log("m", diff / (1000 * 60));

    console.log("h", diff / (1000 * 60 * 60));
    console.log("d", diff / (1000 * 60 * 60 * 24));
    console.log("m", diff / (1000 * 60 * 60 * 24 * 12));
    console.log("y", diff / (1000 * 60 * 60 * 24 * 12 * 360));
    if (minut < 5) result = "1 минут назад";
    if (minut < 10) result = "5 минут назад";
    if (minut < 30) result = "10 минут назад";
    if (minut < 60) result = "30 минут назад";
    if (hour >= 1 && hour < 24) result = `${hour} ${minut}`;
    if (day >= 1 && day <= 31) result = `${day}`;
    // if (min < 30) result = "day.month";
    // if (min < 30) result = "day.moth.year";

    console.log("---", result);

    return result;
  };

  useEffect(() => {
    setLoading(true);
    API.users
      .getById(comment.userId)
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          {loading && (
            <div className="d-flex align-items-center">Загрузка...</div>
          )}
          {!loading && (
            <div key={comment._id} className="d-flex flex-start">
              <img
                src={`https://avatars.dicebear.com/api/avataaars/${(
                  Math.random() + 1
                )
                  .toString(36)
                  .substring(7)}.svg`}
                className="rounded-circle shadow-1-strong me-3"
                alt="avatar"
                width="65"
                height="65"
              />
              <div className="flex-grow-1 flex-shrink-1">
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1">
                      {user.name}
                      {" - "}
                      <span className="small">{date(comment.created_at)}</span>
                    </p>
                    <button
                      onClick={() => onRemove(comment._id)}
                      type="button"
                      className="btn btn-sm text-primary d-flex align-items-center"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                  <p className="small mb-0">{comment.content}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
Comment.propTypes = {
  comment: PropTypes.object,
  onRemove: PropTypes.func
};

export default Comment;
