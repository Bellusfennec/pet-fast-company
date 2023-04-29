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
  items = !Array.isArray(items)
    ? Object.keys(items).map((key) => ({ key, ...items[key] }))
    : items;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          role="button"
          className={
            "list-group-item" +
            (item[valueProperty] === selectedItem?.[valueProperty]
              ? " active"
              : "")
          }
        >
          {item[contentProperty]}
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
