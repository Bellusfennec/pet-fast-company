import React from "react";
import PropTypes from "prop-types";

const RadioField = (props) => {
  const { options, value, name, onChange, label } = props;

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      {label && <label className="form-label">{label}</label>}
      <div>
        {options &&
          options.map((option) => (
            <div key={option.value} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name={name}
                id={option.name + "_" + option.value}
                value={option.value}
                checked={option.value === value}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                {option.name}
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};
RadioField.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string
};

export default RadioField;
