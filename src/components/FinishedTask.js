import React from "react";
import Button from "@material-ui/core/Button";
import PublicIcon from "@material-ui/icons/Public";

const vrExperience =
  "https://4f3d3840ab234139b37bfba512769fc3.us-west-2.sumerian.aws/";

  const styles = {
    rightIcon: {
      marginLeft: "10px"
    }
  };


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

      <a href={vrExperience} target="_blank">
        <Button variant="contained" color="default">
          View Virtual World
          <PublicIcon style={styles.rightIcon} />
        </Button>
      </a>
    </div>
  );

export default FinishedTask;
