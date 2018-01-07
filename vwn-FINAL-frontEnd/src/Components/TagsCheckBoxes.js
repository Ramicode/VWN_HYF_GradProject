import React, { Component } from 'react'
import Observable from '../Observable'
import Map from '../Components/Map'
import MenuItem from 'material-ui/MenuItem';

class Tags extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: {},
      activeTags: {}
    }
  }

  componentWillMount() {
    this.setState({
      tags: this.props.tags,
      activeTags: {}
    })
  }

  componentWillUnmount() {
    this.setState({
      activeTags: Observable.getHash('t')
    })
  }

  renderTags(tags) {
    return (
      <div className='tags'>
        {Object.keys(tags).map(tag => {
          return (
            <MenuItem key={tag}>
              <label>
                <input
                  defaultChecked={this.props.activeTags[tag] ? true : false}
                  type='checkbox'
                  value={tag}
                  // checked={this.props.activeTags[tag] ? true : false}
                  onChange={this.props.handle
                  }
                />
                {tags[tag]}
              </label>
            </MenuItem>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderTags(this.state.tags)}
      </div>
    )
  }
}

export default Tags