import React from "react";

const BookMark = ({ id, bookmark, onFavorite }) => {
  return (
    <button onClick={() => onFavorite(id)} className="btn btn-light">
      {bookmark ? (
        <i class="bi bi-bookmark-fill"></i>
      ) : (
        <i class="bi bi-bookmark"></i>
      )}
    </button>
  );
};

export default BookMark;
