import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Card, CardHeader } from "material-ui/Card";
import Button from "@material-ui/core/Button";
import { GridList, GridTile } from "material-ui/GridList";
import Subheader from "material-ui/Subheader";
import CardActions from "@material-ui/core/CardActions";
import CheckMark from "../assets/check_mark.png";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SchoolIcon from "@material-ui/icons/School";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },
  gridList: {
    overflowY: "auto"
  },
  button: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
    zIndex: 5
  }
};


class Tasks extends Component {
  state = {
    bIsFabOpen: false
  };

  fabActions = [
    {
      icon: <DirectionsRunIcon />,
      name: "Test AI",
      redirectUrl: "/tasks/new-task/test-ai/type"
    },
    {
      icon: <SchoolIcon />,
      name: "Train AI",
      redirectUrl: "/tasks/new-task/train-ai/type"
    }
  ];

  redirectTo(redirectUrl) {
    this.props.history.push(redirectUrl);
  }

  redirectToTaskDetailsPage = task => {
    const redirectUrl = `/tasks/${task.id}`;
    this.redirectTo(redirectUrl);
  };

  redirectToNewTaskPage = () => {
    const redirectUrl = `/tasks/new-task`;
    this.redirectTo(redirectUrl);
  };

  closeFab = () => {
    this.setState({ bIsFabOpen: false });
  };

  openFab = () => {
    this.setState({ bIsFabOpen: true });
  };

  handleFabClick = () => {
    this.setState(state => ({
      bIsFabOpen: !state.bIsFabOpen
    }));
  };



  render() {
    return (
      <div style={styles.root}>
        <h1>All Tasks</h1>

        <GridList cellHeight={150} style={styles.gridList}>
          <Subheader>
            Click task for more info. Train and test AI in virtual simulated
            worlds.
          </Subheader>
          {this.props.tasks &&
            this.props.tasks.map(task => (
              <GridTile key={task.id}>
                <Card>
                  <CardHeader
                    title={`${task.type} Task`}
                    subtitle={task.status}
                    action={<button>yo</button>}
                    avatar={
                      task.status === "Running" ? (
                        <CircularProgress />
                      ) : (
                        CheckMark
                      )
                    }
                  />
                  <CardActions>
                    <Button
                      onClick={() => this.redirectToTaskDetailsPage(task)}
                      size="small"
                    >
                      Details
                    </Button>
                    <Button
                      onClick={() => this.props.onDeleteTask(task.id)}
                      size="small"
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </GridTile>
            ))}
        </GridList>
        <SpeedDial
          style={styles.button}
          ariaLabel="SpeedDial example"
          icon={<SpeedDialIcon />}
          direction="up"
          open={this.state.bIsFabOpen}
          onBlur={this.closeFab}
          onClick={this.handleFabClick}
          onClose={this.closeFab}
          onFocus={this.openFab}
          onMouseEnter={this.openFab}
          onMouseLeave={this.closeFab}
        >
          {this.fabActions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => this.redirectTo(action.redirectUrl)}
            />
          ))}
        </SpeedDial>
      </div>
    );
  }
}

export default Tasks;
