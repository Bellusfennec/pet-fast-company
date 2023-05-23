/* eslint-disable indent */
import React from "react";
import PropTypes from "prop-types";

const SelectField = (props) => {
  const { label, value, onChange, defaultOption, options, error } = props;
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          name: options[optionName].name,
          _id: options[optionName]._id
        }))
      : options;
  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };

  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id="validationCustom04"
        name="profession"
        value={value}
        onChange={onChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
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
