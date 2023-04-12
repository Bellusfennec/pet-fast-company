import React from "react";

const BookMark = ({ _id, bookmark, onFavorite }) => {
  return (
    <div onClick={() => onFavorite(_id)}>
      {bookmark ? "отмечен" : "не отмечен"}
    </div>
  );
};

export default BookMark;
