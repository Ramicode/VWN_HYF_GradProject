import React, { Component } from 'react';
import regions from '../Data/Map.json';
import Observable from '../Observable';

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      regions: {},
      style: {
        fillOpacity: "1",
        strokeOpacity: "1",
        strokeWidth: "0.5",
        cursor: "pointer"
      },
      hoveredRegion: '',
      activeRegions: {}
    };
  }

  componentWillMount() {
    this.setState({
      regions,
      activeRegions: this.props.activeRegions
    });
  }

  render() {
    const { regions, style, hoveredRegion, activeRegions } = this.state
    return (
      <div>
        <svg width={400} height={500} viewBox="-50 50 950 1000" className="regionMap">
          {Object.keys(regions).map(region => {
            return (
              <g className="regions" key={region}>
                <path
                  id={region}
                  region={region['id']}
                  fill={region === hoveredRegion ? "#ed2f25" : "#e9e8e3" && activeRegions[region] ? "#f48101" : "#e9e8e3"}
                  stroke={region === hoveredRegion ? "#ed2f25" : "#f48101"}
                  d={regions[region]["path"]}
                  onClick={this.props.handle}
                  style={style}
                  onMouseEnter={() => this.setState({ hoveredRegion: region })}
                  onMouseOut={() => this.setState({ hoveredRegion: "" })}
                />
                <title>{regions[region]["title"]}</title>
              </g>
            )
          })}
        </svg>
      </div>
    )
  }
}

export default Map