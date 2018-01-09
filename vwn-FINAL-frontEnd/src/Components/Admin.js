import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Badge from 'material-ui/Badge';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
      orgs: {},
      open: false,
    };
  }

  componentWillMount() {
    this.setState({
      orgs: this.props.orgs
    })
  }

  handleChange = (value) => {
    this.setState({
      value: value,
      open: false
    });
  };

  handleClick = () => {
    alert("to show more info please go to the orgs main page");
  }

  handleRequestDelete = () => {
    this.setState({
      open: true
    });
  }

  handleDialogClose = () => {
    this.setState({open: false});
  };

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleDialogClose}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleDialogClose}
      />,
    ];
    const orgs = this.state.orgs
    return (
      <div className="adminPage">
        <Badge
          badgeContent={10}
          secondary={true}
          badgeStyle={{ top: 12, right: 12 }}
        >
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab label="Active Organizations" value="a">
              <div>
                <h2 style={styles.headline}>Active Organizations:</h2>
                {Object.keys(orgs).map((org) => {
                  return (
                    <div key={org}>
                      <Chip
                        onRequestDelete={this.handleRequestDelete}
                        onClick={this.handleClick}
                        style={styles.chip}
                      >
                        <Avatar src={orgs[org]["logo"]} />
                        {orgs[org]["name"]}
                      </Chip>
                    </div>
                  )
                })}
              </div>
            </Tab>
            <Tab label="Requests" value="b">
              <div>
                <h2 style={styles.headline}>Controllable Tab B</h2>
                <p>
                  This is another example of a controllable tab. Remember, if you
              use controllable Tabs, you need to give all of your tabs values or else
              you wont be able to select them.
            </p>
              </div>
            </Tab>
          </Tabs>
        </Badge>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Are you sure you want to delete this organization ?
        </Dialog>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <h2 style={styles.headline}>Tabs with slide effect</h2>
            Swipe to see the next slide.<br />
          </div>
          <div style={styles.slide}>
            slide n°2
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default Admin;