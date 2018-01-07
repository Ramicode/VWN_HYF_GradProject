import React, { Component } from 'react'
import Observable from '../Observable';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import AppBar from 'material-ui/AppBar';
import TagsCheckBoxes from './TagsCheckBoxes';
import '../CSS/Tags.css';

class FilterTags extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: {},
      activeTags: {},
      open: false
    }
  }

  componentDidMount() {
    this.setState({
      tags: this.props.tags,
    })
  }

  componentWillMount() {
    this.setState({ activeTags: Observable.getHash("t") })
  }

  handleCheckbox = (event) => {
    let { activeTags } = this.state
    if (event.target.checked) {
      activeTags[event.target.value] = true
    } else {
      activeTags[event.target.value] = false
    }
    Observable.setHash('t', activeTags)
    Observable.updateState('Observable', 'activeTags', activeTags)
  }

  render() {
    const { tags, open } = this.state
    return (
      <div className="tags">
        <FlatButton
          label="Categories"
          onClick={() => this.setState({ open: !open })}
        />
        <Drawer
          docked={false}
          width={200}
          openSecondary={true}
          open={open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <AppBar title="Categories:"
            showMenuIconButton={false}
            titleStyle={{ color: "#ed2f25" }}
            className="DTitle" />
          <TagsCheckBoxes tags={this.props.tags} activeTags={this.state.activeTags} handle={this.handleCheckbox} />
        </ Drawer>
      </div>
    )
  }
}

export default FilterTags;