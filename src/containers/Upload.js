import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import uuidv1 from "uuid/v1";
import Button from "@material-ui/core/Button";
import Subheader from "material-ui/Subheader";
import Paper from "@material-ui/core/Paper";

const createNewTaskMutation = `mutation createNewTask($id: ID!, $datasetWorld: String, $type: TaskType!, $status: TaskStatus!, $datasetPreset: String, $mlModel: String, $trainingAlgorithm: String, $startedOn: String, $endedOn: String) {
  createTask(input: {
    id: $id
    type: $type
    status: $status
    datasetWorld: $datasetWorld
    datasetPreset: $datasetPreset
    mlModel: $mlModel
    trainingAlgorithm: $trainingAlgorithm
    startedOn: $startedOn
    endedOn: $endedOn
  }) {
    id
    status
    type
  }
}`;

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  paper: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

class Upload extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  goBackToTasksPage() {
    this.props.history.push("/tasks");
  }

  provideTaskInformation(newTask) {
    const file = this.fileInput.current.files[0];
    if (newTask.type === "Train") {
      this.props.onCreateNewTask({
        ...newTask,
        trainingAlgorithm: file
      });
    } else if (newTask.type === "Test") {
      this.props.onCreateNewTask({
        ...newTask,
        mlModel: file
      });
    }
  }

  toCapitalCase(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
  }

  async createNewTask() {
    const { params } = this.props.match;
    const aiType = params.aiType.split('-')[0];
    const createNewTaskMutationParameters = {
      id: uuidv1(),
      type: this.toCapitalCase(aiType),
      status: Math.random() > 0.5 ? "Running" : "Finished",
      datasetPreset: this.toCapitalCase(params.preset),
      datasetWorld: this.toCapitalCase(params.world),
      mlModel: null,
      trainingAlgorithm: 'training-algorithm.txt',
      startedOn: Date.now(),
      endedOn: null
    };
    const createNewTaskOperation = graphqlOperation(
      createNewTaskMutation,
      createNewTaskMutationParameters
    );
    const {
      data: { createTask: newTask }
    } = await API.graphql(createNewTaskOperation);
    return newTask;
  }

  startTask = async () => {
    const newTask = await this.createNewTask();
    this.provideTaskInformation(newTask);
    this.goBackToTasksPage();
  };

  render() {
    return (
      <div style={styles.root}>
        <h1>Choose What Type of Neural Net</h1>
        <Button
          onClick={() => {
            this.props.history.push("../choose-dataset");
          }}
        >
          Back
        </Button>
        <Paper style={styles.paper}>
          <Subheader>Upload Training Algorithm</Subheader>
          <br />
          <input type="file" ref={this.fileInput} />
          <br />
          <Button variant="contained" color="primary" onClick={this.startTask}>
            Launch Task
          </Button>
        </Paper>
      </div>
    );
  }
}

export default Upload;
