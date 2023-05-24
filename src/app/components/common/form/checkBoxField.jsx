import React from "react";
import PropTypes from "prop-types";

const checkBoxField = (props) => {
  const { name, label, value, onChange, children, error, margin } = props;

  const handleChange = () => {
    onChange({ name, value: !value });
  };

  const getInputClasses = () => {
    return "form-check-input" + (error ? " is-invalid" : "");
  };

  return (
    <div className={margin ? "mb-4" : ""}>
      {label && <label className="form-label">{label}</label>}
      <div className="form-check">
        <input
          className={getInputClasses()}
          type="checkbox"
          value=""
          id={name}
          onChange={handleChange}
          checked={value}
        />
        <label className="form-check-label" htmlFor={name}>
          {children}
        </label>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};
checkBoxField.defaultProps = {
  margin: true
};
checkBoxField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  margin: PropTypes.bool
};

export default checkBoxField;
