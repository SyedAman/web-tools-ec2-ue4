import React, { Component } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PublicIcon from '@material-ui/icons/Public';

import FinishedTask from './FinishedTask';
import RunningTask from './RunningTask';

const vrExperience =
  "https://4f3d3840ab234139b37bfba512769fc3.us-west-2.sumerian.aws/";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  rightIcon: {
    marginLeft: "10px"
  }
};

const getTaskQuery = `query getTaskQuery($id: ID!) {
  getTask(id: $id) {
    status
    type
    startedOn
  }
}`

class TaskDetails extends Component {
  state = {
    task: null
  }

  async getTask() {
    const getTaskQueryParameters = {
      id: this.props.match.params.taskid
    }
    const listQueryOperation = graphqlOperation(getTaskQuery, getTaskQueryParameters);
    const { data: { getTask: task }} = await API.graphql(listQueryOperation);
    return task;
  }

  async componentWillMount() {
    const task = await this.getTask();
    this.setState({ task })
  }

  render() {
    const { task } = this.state;
    return (
      <div style={styles.root}>
        <h1>Task Details</h1>
        <Button onClick={() => {this.props.history.push('../tasks')}}>
          Back
        </Button>
        {
          task && task.status === 'Running' ? <RunningTask task={task} /> :   <FinishedTask task={task} />
        }
        <a href={vrExperience} target="_blank">
          <Button variant="contained" color="default">
            View Virtual World
            <PublicIcon style={styles.rightIcon}/>
          </Button>
        </a>
      </div>
    )
  }
}

export default TaskDetails;
