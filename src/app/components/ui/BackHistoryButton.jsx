import React from "react";
import { useHistory } from "react-router-dom";

const BackHistoryButton = () => {
  const history = useHistory();

  return (
    <button
      onClick={() => history.goBack()}
      type="button"
      className="btn btn-primary"
    >
      <i className="bi bi-caret-left"></i>
      Назад
    </button>
  );
};

export default BackHistoryButton;
