import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  const handlePhrase = (number) => {
    if (!number) return "Никто с тобой не тусанёт";
    if (number === 1) return `${number} человек тусанёт с тобой сегодня`;
    if (number <= 4) return `${number} человека тусанёт с тобой сегодня`;
    if (number) return `${number} человек тусанёт с тобой сегодня`;
  };
  return (
    <span className={`badge m-2 ${length > 0 ? "bg-primary" : "bg-danger"} `}>
      {handlePhrase(length)}
    </span>
  );
};
SearchStatus.propTypes = {
  length: PropTypes.number.isRequired
};
export default SearchStatus;
