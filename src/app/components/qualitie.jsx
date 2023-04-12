import React from "react";

const Qualitie = ({ _id, name, color }) => {
  return (
    <span key={_id} className={`badge bg-${color} me-2`}>
      {name}
    </span>
  );
};

export default Qualitie;
