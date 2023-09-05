import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ name, color }) => {
  return <span className={`badge bg-${color} me-2`}>{name}</span>;
};
Qualitie.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};
export default Qualitie;
