/* eslint-disable no-prototype-builtins */
import React from "react";
import PropTypes from "prop-types";

function GroupList({
  items,
  onItemSelect,
  selectedItem,
  valueProperty,
  contentProperty
}) {
  if (!Array.isArray(items)) {
    items = Object.keys(items).map((key) => ({ key, ...items[key] }));
  }

  return (
    <ul className="list-group">
      {Object.keys(items).map((item) => (
        <li
          key={items[item][valueProperty]}
          onClick={() => onItemSelect(items[item])}
          role="button"
          className={
            "list-group-item" + (items[item] === selectedItem ? " active" : "")
          }
        >
          {items[item][contentProperty]}
        </li>
      ))}
    </ul>
  );
}
GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired
};

export default GroupList;
