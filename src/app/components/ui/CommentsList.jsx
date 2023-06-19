import React, { useEffect, useState } from "react";
import API from "../../api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Comment from "./Comment";
import { validator } from "../../utils/validator";

const CommentsList = () => {
  const { userId } = useParams();
  const [, setLoading] = useState(true);
  const [comments, setComments] = useState();
  const [commentForm, setCommentForm] = useState({});
  const [commentFormError, setCommentFormError] = useState({});
  const [users, setUsers] = useState();

  useEffect(() => {
    setLoading(true);
    API.comments
      .fetchCommentsForUser(userId)
      .then((data) => {
        setComments(data);
      })
      .finally(() => setLoading(false));
    API.users
      .fetchAll()
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  const handlerRemoveComment = (commentId) => {
    console.log(commentId);
    API.comments.remove(commentId).then(() => {
      const filtered = comments.filter((comment) => comment._id !== commentId);
      setComments(filtered);
    });
  };

  const handlerChangeCommentForm = (event) => {
    const { name, value } = event.target;
    setCommentForm({ ...commentForm, [name]: value || "" });
  };

  const handlerSendCommentForm = () => {
    const isValid = validate();
    if (!isValid) return;
    API.comments.add(commentForm).then((data) => {
      setComments([...comments, data]);
      setCommentForm({});
    });
  };

  const validatorCongig = {
    userId: {
      isRequired: {
        message: "Автор обязателен для заполнения"
      }
    },
    content: {
      isRequired: {
        message: "Сообщение обязательна для заполнения"
      }
    }
  };

  useEffect(() => {
    validate();
  }, [commentForm]);

  const validate = () => {
    const error = validator(commentForm, validatorCongig);
    setCommentFormError(error);
    return Object.keys(error).length === 0;
  };

  const isValid = Object.keys(commentFormError).length === 0;
  console.log(commentFormError);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <div>
            <h2>New comment</h2>
            <div className="mb-4">
              <select
                onChange={handlerChangeCommentForm}
                className="form-select"
                name="userId"
                value={commentForm.userId || ""}
              >
                <option disabled value="">
                  Выберите пользователя
                </option>
                {users &&
                  users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
              </select>
              {commentFormError.userId && (
                <div className="invalid-feedback">
                  {commentFormError.userId}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Сообщение
              </label>
              <textarea
                onChange={handlerChangeCommentForm}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                name="content"
                value={commentForm.content || ""}
              ></textarea>
              {commentFormError.content && (
                <div className="invalid-feedback">
                  {commentFormError.content}
                </div>
              )}
            </div>
            <div className="d-flex justify-content-end">
              <button
                onClick={handlerSendCommentForm}
                disabled={!isValid}
                type="button"
                className="btn btn-primary"
              >
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      </div>
      {comments && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr />
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                onRemove={handlerRemoveComment}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CommentsList;
