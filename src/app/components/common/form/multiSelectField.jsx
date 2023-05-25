/* eslint-disable indent */
import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = (props) => {
  const { options, onChange, name, label, error, defaultValue } = props;

  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.values(options)
      : options;

  const handleChange = (value) => {
    onChange({ name, value });
  };

  const getInputClasses = () => {
    return "basic-multi-select" + (error ? " is-invalid" : "");
  };

  return (
    <div className="mb-4">
      {label && <label className="form-label">{label}</label>}
      <Select
        closeMenuOnSelect={false}
        isMulti
        defaultValue={defaultValue}
        options={optionsArray}
        className={getInputClasses()}
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  defaultValue: PropTypes.array,
  label: PropTypes.string,
  error: PropTypes.string
};

export default MultiSelectField;
