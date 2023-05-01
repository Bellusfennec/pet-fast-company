import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length, profession, loading }) => {
  const human = profession ? profession.name.toLowerCase() : "человек";
  const handlePhrase = (number) => {
    if (loading) return `Ищем людей...`;
    if (!number && profession) return `Никто из ${human}ов с тобой не тусанёт`;
    if (!number) return "Никто с тобой не тусанёт";
    if (number === 1) return `${number} ${human} тусанёт с тобой сегодня`;
    if (number <= 4) return `${number} ${human}а тусанёт с тобой сегодня`;
    if (number) return `${number} ${human} тусанёт с тобой сегодня`;
  };
  return (
    <span className={`badge m-2 ${length > 0 ? "bg-primary" : "bg-danger"} `}>
      {handlePhrase(length)}
    </span>
  );
};
SearchStatus.propTypes = {
  length: PropTypes.number.isRequired,
  profession: PropTypes.object,
  loading: PropTypes.bool
};
export default SearchStatus;
