import { orderBy } from "lodash";
import React from "react";
import { useComments } from "../../hooks/useComments";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

const CommentsList = () => {
  const { createComment, comments, removeComment } = useComments();

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
            {sortedComments.map((comment) => (
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
