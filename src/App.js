import React, { useState } from "react";
import "./App.css";
// components
import IntervalInputs from "./components/IntervalInputs";
// import lodash
var _ = require("lodash");

const App = () => {
  const [globalInputs, setGlobalInputs] = useState([{ x: 0, y: 0 }]);
  const [globalOutputs, setGlobalOutputs] = useState();

  // function to add inputs
  const handleAddInterval = () => {
    const notValid = globalInputs.find((el) => _.isNil(el.x) || _.isNil(el.y));
    if (notValid) {
      alert(
        "Il faut tout d'abord remplir les intervals déjà affichés dans la page"
      );
      return;
    }

    setGlobalInputs([...globalInputs, { x: 0, y: 0 }]);
  };

  // function to add inputs
  const handleSubmit = () => {
    if (globalInputs && globalInputs.length) {
      const rangeNotValid = globalInputs.find((el) => el.x > el.y);
      if (rangeNotValid) {
        alert("Faire attention, il faut que les intervals soient valides");
        return;
      }
      // prepare intervals inputs
      const newGlobalInputs = globalInputs.map((el) => {
        const array = [el.x, el.y];
        return array;
      });
      // sort intevals input
      const sortedGlobalInputs = newGlobalInputs.sort((a, b) => a[0] - b[0]);
      // initialize result output
      let result = [sortedGlobalInputs[0]];
      //loop inputs
      for (let i = 1; i < sortedGlobalInputs.length; i++) {
        const input = sortedGlobalInputs[i];
        let lastOutput = result[result.length - 1];
        if (input[0] > lastOutput[1]) {
          result.push(input);
        } else if (input[1] > lastOutput[1]) {
          lastOutput[1] = input[1];
        }
      }
      setGlobalOutputs(result);
    }
  };

  // function to reset inputs
  const handleReset = () => {
    setGlobalInputs([{ x: 0, y: 0 }]);
    setGlobalOutputs([]);
  };

  // remove from inputs
  const handleRemove = (indexToDelete) => {
    const newGlobalInputs = globalInputs.filter(
      (item, index) => index !== indexToDelete
    );
    setGlobalInputs(newGlobalInputs);
  };

  // function to update global inputs
  const handleUpdateInterval = (key, x, y) => {
    const newGlobalInputs = globalInputs.map((item, index) => {
      if (index === key) return { x, y };
      return item;
    });
    setGlobalInputs(newGlobalInputs);
  };

  return (
    <div className="container">
      <div className="container-inputs">
        <div className="container-buttons">
          <button className="button" onClick={handleAddInterval}>
            Add
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
          <button className="button" onClick={handleSubmit}>
            Union
          </button>
        </div>
        <div className="container-intervals">
          {globalInputs.map((interval, index) => (
            <div className="container-line" key={index}>
              <IntervalInputs
                interval={interval}
                onChange={(x, y) => handleUpdateInterval(index, x, y)}
              />
              <div className="text-interval">
                {"[" + interval["x"] + "," + interval["y"] + "]"}
              </div>
              <div className="container-remove">
                {index ? (
                  <button
                    className="remove-button"
                    onClick={() => {
                      handleRemove(index);
                    }}
                  >
                    X
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container-outputs">
        <span>
          Result :
          {globalOutputs && globalOutputs.length
            ? "[" +
              globalOutputs.map((el) => {
                return "[" + el[0] + "," + el[1] + "]";
              }) +
              "]"
            : "- - -"}
        </span>
      </div>
    </div>
  );
};

export default App;
