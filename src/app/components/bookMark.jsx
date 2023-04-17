import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ id, bookmark, onFavorite }) => {
  return (
    <button onClick={() => onFavorite(id)} className="btn btn-light">
      <i className={`bi bi-bookmark${bookmark ? "-fill" : ""}`}></i>
    </button>
  );
};
BookMark.propTypes = {
  id: PropTypes.string.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onFavorite: PropTypes.func.isRequired
};
export default BookMark;
