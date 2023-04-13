import React from "react";

const BookMark = ({ id, bookmark, onFavorite }) => {
  return (
    <button onClick={() => onFavorite(id)} className="btn btn-light">
      <i class={`bi bi-bookmark${bookmark ? "-fill" : ""}`}></i>
    </button>
  );
};

export default BookMark;
