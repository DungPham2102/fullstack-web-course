// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import ReactDOM from "react-dom";
import { tesla, honda } from "./practice";

const {
  coloursByPopularity: [teslaTopColour, teslaSecondColour],
  speedStats: { topSpeed: hondaTopSpeed, zeroToSixty: hondaZeroToSixty },
} = tesla;

const {
  coloursByPopularity: [hondaTopColour, hondaSecondColour],
  speedStats: { topSpeed: teslaTopSpeed, zeroToSixty: teslaZeroToSixty },
} = honda;

ReactDOM.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
    </tr>
    <tr>
      <td>{tesla.model}</td>
      <td>{teslaTopSpeed}</td>
      <td>{teslaTopColour}</td>
    </tr>
    <tr>
      <td>{honda.model}</td>
      <td>{hondaTopSpeed}</td>
      <td>{hondaTopColour}</td>
    </tr>
  </table>,
  document.getElementById("root")
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
