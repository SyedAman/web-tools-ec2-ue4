import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsExports from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";

import Tasks from "./containers/Tasks";
import TaskDetails from "./components/TaskDetails";
import NewTask from "./containers/NewTask";
import AIType from "./containers/AIType";
import ChooseDataset from "./containers/ChooseDataset";
import Upload from "./containers/Upload";

Amplify.configure(awsExports);

const listTasksQuery = `query listTasksQuery {
  listTasks(limit: 50){
    items {
      id
      status
      type
    }
  }
}`;

const deleteTaskMutation = `mutation deleteTask($id: ID!) {
  deleteTask(input: {
    id: $id
  }) {
    id
  }
}`;

class App extends Component {
  state = {
    tasks: []
  };

  createNewTask = newTask => {
    this.setState({
      tasks: [...this.state.tasks, newTask]
    });
  };

  async getTasks() {
    const listQueryOperation = graphqlOperation(listTasksQuery);
    const {
      data: {
        listTasks: { items: tasks }
      }
    } = await API.graphql(listQueryOperation);
    return tasks;
  }

  deleteTask = async taskId => {
    const deleteTaskMutationParameters = {
      id: taskId
    };
    const deleteTaskOperation = graphqlOperation(
      deleteTaskMutation,
      deleteTaskMutationParameters
    );
    const {
      data: { deleteTask: deletedTask }
    } = await API.graphql(deleteTaskOperation);

    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== deletedTask.id)
    });
  };

  async componentWillMount() {
    const tasks = await this.getTasks();
    this.setState({ tasks });
  }

  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route
              path="(/|/tasks)"
              exact
              render={props => (
                <Tasks
                  {...props}
                  tasks={this.state.tasks}
                  onDeleteTask={this.deleteTask}
                />
              )}
            />
            <Route path="/tasks/new-task" exact component={NewTask} />
            <Route
              path="/tasks/:taskid"
              exact
              render={props => (
                <TaskDetails
                  {...props}
                  task={this.state.tasks[props.match.params.taskid]}
                />
              )}
            />
            <Route
              path="/tasks/new-task/:aiType/type"
              exact
              component={AIType}
            />
            <Route
              path="/tasks/new-task/:aiType/:preset/choose-dataset"
              exact
              component={ChooseDataset}
            />
            <Route
              path="/tasks/new-task/:aiType/:preset/:world/upload"
              exact
              render={props => (
                <Upload {...props} onCreateNewTask={this.createNewTask} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default withAuthenticator(App, true);
