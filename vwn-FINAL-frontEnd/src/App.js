import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Orgs from './Components/Orgs';
import Header from './Components/Header';
import LandingPage from './Components/LandingPage';
import Add from './Components/Add';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Observable from './Observable';
import Switch from 'react-router-dom/Switch';
import './CSS/App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.serverLink = 'http://localhost:8080/'
    this.state = {
      Data: {},
      status: 0
    }
  }

  componentDidMount() {
    Observable.newStatefullObservable("Observable");
    const xhr = new XMLHttpRequest();
    xhr.open('Get', `${this.serverLink}search`, true)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.setState({
            Data: JSON.parse(xhr.response),
          })
        }
        this.setState({
          status: xhr.status
        });
      }
    }
    xhr.send()
  }

  render() {
    console.log(this.state.Data)
    const { tags, orgs } = this.state.Data
    if (this.state.status === 200) {
      return (
        <MuiThemeProvider>
          <Router>
            <div>
              <LandingPage data={orgs} />
              <Route className="route" exact path="/add" component={() => {
                return (
                  <div className="add-page">
                    <Add tags={tags} />
                  </div>
                )
              }} />
              <Route className="route" exact path="/home" component={() => {
                return (
                  <div className="app-home-container">
                    <div><Header tags={tags} /></div>
                    <div><Orgs orgs={orgs} /></div>
                  </div>
                )
              }} />
            </div>
          </Router>
        </MuiThemeProvider>

      );
    }
    else { return (<div>{this.state.status}</div>) }
  }
}

export default App;