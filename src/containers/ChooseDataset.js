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

class ChooseDataset extends Component {
  redirectToUpload(world) {
    this.props.history.push(`${world}/upload`);
  }

  render() {
    return (
      <div style={styles.root}>
        <h1>Choose Virtual Simulated World</h1>
        <Button
          onClick={() => {
            this.props.history.push("../type");
          }}
        >
          Back
        </Button>
        <List component="nav">
          <Subheader>
            Choose the dataset. We have a variety of different worlds. If you require specific parameters, contact us.
          </Subheader>
          <ListItem
            button
            onClick={() => this.redirectToUpload("tokyo")}
          >
            <ListItemIcon>
              <DirectionsCarIcon />
            </ListItemIcon>
            <ListItemText primary="Tokyo" />
          </ListItem>
          <ListItem
            button
            onClick={() => this.redirectToUpload("nyc")}
          >
            <ListItemIcon>
              <LocalAirportIcon />
            </ListItemIcon>
            <ListItemText primary="NYC" />
          </ListItem>
          <ListItem
            button
            onClick={() => this.redirectToUpload("countryside")}
          >
            <ListItemIcon>
              <LocalAirportIcon />
            </ListItemIcon>
            <ListItemText primary="Country Side" />
          </ListItem>
          <ListItem
            button
            onClick={() => this.redirectToUpload("mexico")}
          >
            <ListItemIcon>
              <WarningIcon />
            </ListItemIcon>
            <ListItemText primary="Mexico" />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default ChooseDataset;
