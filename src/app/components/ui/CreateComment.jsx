import React, { useState, useCallback, useEffect } from "react";
import { validator } from "../../utils/validator";
import PropTypes from "prop-types";

const CreateComment = ({ onSubmit }) => {
  const [commentForm, setCommentForm] = useState({});
  const [commentFormError, setCommentFormError] = useState({});
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

  const handlerSubmitComment = () => {
    const isValid = validate();
    if (!isValid) return;
    onSubmit(commentForm);
    setCommentForm({});
    setActivated(false);
  };

  const validatorCongig = {
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
          onClick={handlerSubmitComment}
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
