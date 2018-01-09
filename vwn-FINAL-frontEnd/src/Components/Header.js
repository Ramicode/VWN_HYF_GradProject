import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Tags from './Tags';
import RegionSearch from './RegionSearch';
import '../CSS/AppBar.css';

export default class Header extends Component {
    render() {

        const image = "https://www.vluchtelingenwerk.nl/sites/all/themes/vwn_internet/img/logo-header-1.png";
        const headerRight = (
            <div id="headerButtonsRight">
                <div><RegionSearch /></div>
                <div><Tags tags={this.props.tags} /></div>
            </div>
        );
        return (
            <div id="AppBar">
                <AppBar
                    className="header"
                    iconElementLeft={<img src={image}
                        alt="vwn-logo"
                    />}
                    iconElementRight={headerRight}
                />
            </div>
        )
    }
}