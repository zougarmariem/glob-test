import React from "react";
import "./style.css";

const IntervalInputs = ({ interval, onChange }) => {

  // function to change inputs
  const handleChange = (event, type) => {
    const value = event.target.value;
    // change x's value
    if (type === "x") {
      onChange(value || value === 0 ? parseInt(value) : null, interval.y);
    }
    // change y's value
    else {
      onChange(interval.x, value || value === 0 ? parseInt(value) : null);
    }
  };

  // function to validate inputs
  const handleBlur = (type) => {
    // get out if x > y
    if (interval.x && interval.y && interval.x > interval.y) {
      alert("la valeur de X ne doit pas être superieur à celle de Y");
      if (type === "x") {
        onChange(0, interval.y);
      } else {
        onChange(interval.x, 0);
      }
    }
  };

  return (
    <div className="container-interval-inputs">
      <input
        type="number"
        placeholder="X"
        className="input"
        value={interval.x}
        onChange={(event) => {
          handleChange(event, "x");
        }}
        onBlur={() => {
          handleBlur("x");
        }}
      />
      <input
        type="number"
        placeholder="Y"
        className="input"
        value={interval.y}
        onChange={(event) => {
          handleChange(event, "y");
        }}
        onBlur={() => {
          handleBlur("y");
        }}
      />
    </div>
  );
};

export default IntervalInputs;
