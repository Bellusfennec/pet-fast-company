import React from "react";

const BookMark = ({ id, bookmark, onFavorite }) => {
  return (
    <div onClick={() => onFavorite(id)}>
      {bookmark ? "отмечен" : "не отмечен"}
    </div>
  );
};

export default BookMark;
