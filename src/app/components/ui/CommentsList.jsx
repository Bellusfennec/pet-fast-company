import React, { useCallback, useEffect, useState } from "react";
import API from "../../api";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import { orderBy } from "lodash";

const CommentsList = () => {
  const { userId } = useParams();
  const [, setLoading] = useState(true);
  const [comments, setComments] = useState();

  useEffect(() => {
    setLoading(true);
    API.comments
      .fetchCommentsForUser(userId)
      .then((data) => {
        setComments(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handlerRemoveComment = useCallback((commentId) => {
    API.comments.remove(commentId).then(() => {
      const filtered = comments.filter((comment) => comment._id !== commentId);
      setComments(filtered);
    });
  }, []);

  const handlerSubmitComment = (formData) => {
    API.comments.add(formData).then((data) => {
      setComments([...comments, data]);
    });
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
