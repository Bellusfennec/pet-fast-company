/* eslint-disable indent */
import React from "react";
import PropTypes from "prop-types";

const SelectField = (props) => {
  const { label, value, onChange, defaultOption, options, error, name } = props;
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.values(options)
      : options;
  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
SelectField.defaultProps = {
  defaultOption: "Выберите..."
};
SelectField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string
  // options: PropTypes.arrayOf(
  //   PropTypes.shape({
  //       name: PropTypes.string.isRequired,
  //       value: PropTypes.string.isRequired
  //   })
  // )
};

export default SelectField;
