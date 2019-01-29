import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

class NewTask extends Component {
  render() {
    return (
      <div style={styles.root}>
        <h1>New Task</h1>
        <Button
          onClick={() => {
            this.props.history.push("../");
          }}
        >
          Back
        </Button>
        <br />
        <Link to={`${this.props.match.path}/train-ai/type`}>
          Train Neural Net
        </Link>
        <br />
        <Link to={`${this.props.match.path}/test-ai/type`}>
          Test Neural Net
        </Link>
      </div>
    );
  }
}

export default NewTask;
