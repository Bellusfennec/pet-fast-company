import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../api";

const Comment = ({ comment, onRemove }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  console.log("comm");

  const date = (date) => {
    const now = new Date();
    console.log(date, now);
    return date;
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
