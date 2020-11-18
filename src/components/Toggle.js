import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

function Toggle({ isChecked, onClick, text, textLeft, textRight }) {
  const toggleStyles = clsx(
    "absolute",
    "block",
    "w-6",
    "h-6",
    "rounded-full",
    "bg-white",
    "border-4",
    "bg-xmrgray-darker",
    "appearance-none",
    "focus:outline-none",
    "cursor-pointer",
    {
      "right-0": isChecked,
      "border-green-400": isChecked,
    }
  );
  const labelStyles = clsx(
    "block",
    "overflow-hidden",
    "h-6",
    "rounded-full",
    "bg-gray-300",
    "cursor-pointer",
    {
      "bg-green-400": isChecked,
    }
  );
  return (
    <div>
      <div className="flex">
        <label
          htmlFor="toggle"
          className="flex-1 text-s text-gray-200 block text-right mx-4"
        >
          {textLeft}
        </label>
        <div className="relative block w-10 mx-auto align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            className={toggleStyles}
            onClick={onClick}
          />
          <label htmlFor="toggle" className={labelStyles}></label>
        </div>
        <label
          htmlFor="toggle"
          className="flex-1 text-s text-gray-200 block text-left mx-4"
        >
          {textRight}
        </label>
      </div>
      <label
        htmlFor="toggle"
        className="text-s text-gray-200 block text-center"
      >
        {text}
      </label>
    </div>
  );
}
Toggle.propTypes = {
  isChecked: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
  textLeft: PropTypes.string,
  textRight: PropTypes.string,
};

export default Toggle;
