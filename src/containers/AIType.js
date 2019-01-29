import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Subheader from "material-ui/Subheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import LocalAirportIcon from "@material-ui/icons/LocalAirport";
import WarningIcon from "@material-ui/icons/Warning";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
};

class AIType extends Component {
  redirectToChooseDataset(preset) {
    this.props.history.push(`${preset}/choose-dataset`);
  }

  render() {
    return (
      <div style={styles.root}>
        <h1>Choose Preset</h1>
        <Button
          onClick={() => {
            this.props.history.push("/tasks");
          }}
        >
          Back
        </Button>
        <List component="nav">
          <Subheader>
            Choose a preset. If you don't see a preset you desire, contact us.
          </Subheader>
          <ListItem
            button
            onClick={() => this.redirectToChooseDataset("driving")}
          >
            <ListItemIcon>
              <DirectionsCarIcon />
            </ListItemIcon>
            <ListItemText primary="Driving" />
          </ListItem>
          <ListItem
            button
            onClick={() => this.redirectToChooseDataset("flying")}
          >
            <ListItemIcon>
              <LocalAirportIcon />
            </ListItemIcon>
            <ListItemText primary="Flying" />
          </ListItem>
          <ListItem
            button
            onClick={() => this.redirectToChooseDataset("defect-detection")}
          >
            <ListItemIcon>
              <WarningIcon />
            </ListItemIcon>
            <ListItemText primary="Defect Detection" />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default AIType;
