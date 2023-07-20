import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useUser } from "../../hooks/useUsers";
import { useAuth } from "../../hooks/useAuth";

const Comment = (props) => {
  const { onRemove, comment } = props;
  const { getUserById } = useUser();
  const { currentUser } = useAuth();
  const user = getUserById(comment.userId);

  const date = (ms) => {
    const now = new Date();
    const date = new Date(Number(ms));
    const diff = now - date;
    const minut = Math.floor(diff / (1000 * 60));
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    const year = Math.floor(diff / (1000 * 60 * 60 * 24 * 360));
    // console.log(minut, hour, day, year);

    const getHour = normalizeValue(date.getHours());
    const getMinutes = normalizeValue(date.getMinutes());
    const getDay = normalizeValue(date.getDate());
    const getMouth = date.toLocaleString("default", { month: "long" });
    const getFullYear = date.getFullYear();

    if (minut <= 1) return "1 минуту назад";
    if (minut <= 5) return "5 минут назад";
    if (minut <= 10) return "10 минут назад";
    if (minut <= 30) return "30 минут назад";
    if (minut > 30 && day === 0) {
      return `${getHour}:${getMinutes}`;
    }
    if (day >= 1 && year === 0) {
      return `${getDay} ${getMouth}`;
    }
    if (year >= 1) {
      return `${getDay} ${getMouth} ${getFullYear}`;
    }
  };

  const handlerRemove = useCallback((id) => {
    onRemove(id);
  }, []);

  function normalizeValue(value) {
    return value.toString().length > 1 ? value : `0${value}`;
  }

  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div key={comment._id} className="d-flex flex-start">
            <img
              src={user.image}
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
                  {currentUser._id === user._id && (
                    <button
                      onClick={() => handlerRemove(comment._id)}
                      type="button"
                      className="btn btn-sm text-primary d-flex align-items-center"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
                <p className="small mb-0">{comment.content}</p>
              </div>
            </div>
          </div>
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
