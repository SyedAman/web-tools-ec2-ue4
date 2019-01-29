import React from "react";
import Button from "@material-ui/core/Button";

const FinishedTask = ({ task }) =>
  task && (
    <div>
      {task.type === "Train" && (
        <div>
          <p>Status: ML Model Trained</p>
          <Button variant="contained" color="primary">
            Download ML Model
          </Button>
        </div>
      )}

      <h2>Stats</h2>
      <ul>
        <li>{`Ran in ${Math.floor(Math.random() * Math.floor(50))} hours.`}</li>
        <li>
          {`${Math.floor(
            Math.random() * Math.floor(1000000000)
          ).toLocaleString()} `}
          hours droven.
        </li>
      </ul>
    </div>
  );

export default FinishedTask;
