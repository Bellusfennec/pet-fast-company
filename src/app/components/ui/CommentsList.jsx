import React, { useCallback, useEffect, useState } from "react";
import API from "../../api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Comment from "./Comment";
import { validator } from "../../utils/validator";

const CommentsList = () => {
  const { userId } = useParams();
  const [, setLoading] = useState(true);
  const [comments, setComments] = useState();
  const initialForm = { userId: "", content: "" };
  const [commentForm, setCommentForm] = useState(initialForm);
  const [commentFormError, setCommentFormError] = useState({});
  const [users, setUsers] = useState();
  const [activated, setActivated] = useState(false);

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

  const handlerRemoveComment = useCallback((commentId) => {
    console.log(commentId);
    API.comments.remove(commentId).then(() => {
      const filtered = comments.filter((comment) => comment._id !== commentId);
      setComments(filtered);
    });
  }, []);

  const handlerChangeCommentForm = useCallback(
    (event) => {
      const { name, value } = event.target;
      if (!activated) {
        setActivated(true);
      }
      setCommentForm({ ...commentForm, [name]: value || "" });
    },
    [commentForm]
  );

  const handlerSendCommentForm = () => {
    const isValid = validate();
    if (!isValid) return;
    const formData = { ...commentForm, pageId: userId };
    API.comments.add(formData).then((data) => {
      setComments([...comments, data]);
      setCommentForm(initialForm);
      setActivated(false);
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
    activated ? validate() : setActivated(false);
  }, [commentForm, activated]);

  const validate = useCallback(() => {
    const error = validator(commentForm, validatorCongig);
    setCommentFormError(error);
    return Object.keys(error).length === 0;
  }, [commentForm]);

  const isValid = Object.keys(commentFormError).length === 0;

  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <div>
            <h2>New comment</h2>
            <div className="mb-4">
              <select
                onChange={handlerChangeCommentForm}
                className={
                  "form-select" + (commentFormError.userId ? " is-invalid" : "")
                }
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
                className={
                  "form-control" +
                  (commentFormError.content ? " is-invalid" : "")
                }
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
                disabled={
                  (!commentForm.content && !commentForm.userId) || !isValid
                }
                type="button"
                className="btn btn-primary"
              >
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      </div>
      {comments && comments.length > 0 && (
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
