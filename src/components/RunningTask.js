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
      {task.type === "Train" && (
        <div style={styles.root}>
          <p>Status: Currently Training ML Model...</p>
          <CircularProgress />
        </div>
      )}
    </div>
  );

export default RunningTask;
