import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

const RunningTask = ({ task }) =>
  task && (
    <div>
      {task && (
        <div style={styles.root}>
          <p>{`Status: Currently ${task.type}ing ML Model...`}</p>
          <CircularProgress />
        </div>
      )}
    </div>
  );

export default RunningTask;
