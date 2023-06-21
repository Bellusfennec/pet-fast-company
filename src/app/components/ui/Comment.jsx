import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../api";

const Comment = (props) => {
  const { onRemove, comment } = props;

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const date = (ms) => {
    const now = new Date();
    const date = new Date(Number(ms));
    const diff = now - date;
    const minut = Math.floor(diff / (1000 * 60));
    // const hour = Math.floor(diff / (1000 * 60 * 60));
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    const year = Math.floor(diff / (1000 * 60 * 60 * 24 * 360));
    // console.log(minut, hour, day, year);

    if (minut <= 1) return "1 минуту назад";
    if (minut <= 5) return "5 минут назад";
    if (minut <= 10) return "10 минут назад";
    if (minut <= 30) return "30 минут назад";
    if (minut > 30 && day === 0) {
      return `${date.getHours()}:${date.getMinutes()}`;
    }
    if (day >= 1 && year === 0) {
      return `${date.getDate()} ${date.toLocaleString("default", {
        month: "long"
      })}`;
    }
    if (year >= 1) {
      return `${date.getDate()} ${date.toLocaleString("default", {
        month: "long"
      })} ${date.getFullYear()}`;
    }
  };

  useEffect(() => {
    setLoading(true);
    API.users
      .getById(comment.userId)
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, [comment]);

  const handlerRemove = useCallback((id) => {
    onRemove(id);
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
                      {user && user.name}
                      {" - "}
                      <span className="small">{date(comment.created_at)}</span>
                    </p>
                    <button
                      onClick={() => handlerRemove(comment._id)}
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

export default React.memo(Comment);
