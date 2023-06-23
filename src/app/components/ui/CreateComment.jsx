import React, { useState, useCallback, useEffect } from "react";
import { validator } from "../../utils/validator";
import API from "../../api";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const CreateComment = ({ onSubmit }) => {
  const { userId } = useParams();
  const [, setLoading] = useState(true);
  const initialForm = { userId: "", content: "" };
  const [commentForm, setCommentForm] = useState(initialForm);
  const [commentFormError, setCommentFormError] = useState({});
  const [users, setUsers] = useState();
  const [activated, setActivated] = useState(false);

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
    onSubmit(formData);
    setCommentForm(initialForm);
    setActivated(false);
  };

  useEffect(() => {
    setLoading(true);
    API.users
      .fetchAll()
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

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
          <div className="invalid-feedback">{commentFormError.userId}</div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Сообщение
        </label>
        <textarea
          onChange={handlerChangeCommentForm}
          className={
            "form-control" + (commentFormError.content ? " is-invalid" : "")
          }
          id="exampleFormControlTextarea1"
          rows="3"
          name="content"
          value={commentForm.content || ""}
        ></textarea>
        {commentFormError.content && (
          <div className="invalid-feedback">{commentFormError.content}</div>
        )}
      </div>
      <div className="d-flex justify-content-end">
        <button
          onClick={handlerSendCommentForm}
          disabled={(!commentForm.content && !commentForm.userId) || !isValid}
          type="button"
          className="btn btn-primary"
        >
          Опубликовать
        </button>
      </div>
    </>
  );
};
CreateComment.propTypes = {
  onSubmit: PropTypes.func
};

export default CreateComment;
