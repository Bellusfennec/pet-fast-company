import { orderBy } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useComments } from "../../hooks/useComments";
import {
  getComments,
  getCommentsIsLoading,
  loadCommentsList
} from "../../store/comments";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import { useParams } from "react-router-dom";

const CommentsList = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(getCommentsIsLoading());
  const comments = useSelector(getComments());
  const { createComment, removeComment } = useComments();

  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);

  const handlerRemoveComment = (commentId) => {
    removeComment(commentId);
  };

  const handlerSubmitComment = (data) => {
    createComment(data);
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <CreateComment onSubmit={handlerSubmitComment} />
        </div>
      </div>
      {sortedComments && sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr />
            {isLoading && <p>Загрузка</p>}
            {!isLoading &&
              sortedComments.map((comment) => (
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
