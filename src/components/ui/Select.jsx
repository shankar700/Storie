import React, { useId } from "react";
import PropTypes from 'prop-types';

function Select({ options = [], label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        className={`px-3 py-2 rounded-lg bg-white tet-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        name=""
        id={id}
        {...props}
        ref={ref}
      ></select>
      {options?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </div>
  );
}

Select.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default React.forwardRef(Select);
