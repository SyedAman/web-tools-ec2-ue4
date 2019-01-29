import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Button from "@material-ui/core/Button";

import FinishedTask from "./FinishedTask";
import RunningTask from "./RunningTask";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
};

const getTaskQuery = `query getTaskQuery($id: ID!) {
  getTask(id: $id) {
    status
    type
    startedOn
  }
}`;

class TaskDetails extends Component {
  state = {
    task: null
  };

  async getTask() {
    const getTaskQueryParameters = {
      id: this.props.match.params.taskid
    };
    const listQueryOperation = graphqlOperation(
      getTaskQuery,
      getTaskQueryParameters
    );
    const {
      data: { getTask: task }
    } = await API.graphql(listQueryOperation);
    return task;
  }

  async componentWillMount() {
    const task = await this.getTask();
    this.setState({ task });
  }

  render() {
    const { task } = this.state;
    return (
      <div style={styles.root}>
        <h1>Task Details</h1>
        <Button
          onClick={() => {
            this.props.history.push("../tasks");
          }}
        >
          Back
        </Button>
        {task && task.status === "Running" ? (
          <RunningTask task={task} />
        ) : (
          <FinishedTask task={task} />
        )}
      </div>
    );
  }
}

export default TaskDetails;
