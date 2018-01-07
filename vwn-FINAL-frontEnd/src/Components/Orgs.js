import React, { Component } from 'react';
import Observable from '../Observable';
import ContactInfo from './ContactInfo'
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import '../CSS/Orgs.css';

class Orgs extends Component {

  constructor(props) {
    super(props)
    this.state = {
      orgs: {},
      orgsAfterFilter: {},
      noFilter: true,
    }
    this.filterOrgsbyId = this.filterOrgsbyId.bind(this)
  }

  componentWillMount() {
    this.setState({
      orgs: this.props.orgs
    })
    console.log("will mount", new Date())
    Observable.subscribe('Observable', this.activeOrgs)
  }

  componentDidMount() {
    console.log("did mount", new Date());

    Observable.updateState('Observable', 'activeTags', Observable.getHash('t'))
  }

  componentWillUnmount() {
    console.log("2nd will mount", new Date());

    Observable.unSubscribe('Observable', this.activeOrgs)
  }

  activeOrgs = (data) => {
    console.log("get active orgs", new Date());
    this.setState({
      orgsAfterFilter: this.filterOrgsbyId(data)
    })
  }

  filterOrgsbyId = (data) => {
    console.log("filter function", new Date())
    let { orgs } = this.state
    let filteredOrgs = {}
    for (const orgID in orgs) {
      let filteredOrg = {}
      let org = orgs[orgID]
      const arrayOfTags = org["tags"]
      console.log(arrayOfTags, "where")
      arrayOfTags.forEach(tagID => {
        if (data.activeTags[tagID]) {
          if (filteredOrg.name === undefined) {
            filteredOrg = Object.assign({}, org)
            filteredOrg.id = orgID
          }
        }
      })
      if (filteredOrg.name !== undefined) {
        filteredOrgs[orgID] = Object.assign({}, filteredOrg)
      }
    }

    return filteredOrgs
  }


  renderOrgs(orgs) {
    console.log("renderOrgs", new Date());
    return (
      <div className="orgs">
        {Object.keys(orgs).map(org => {
          return (
            <div className="cardDIV" key={org}>
              <Card
                initiallyExpanded={Observable.getHash("o")[org]}
                onExpandChange={(expanded) => { Observable.setHash("o", Number(org), expanded) }}
                className="card">
                <CardHeader
                  className="cardHeader"
                  title={orgs[org]["name"]}
                  titleStyle={{ color: "#ed2f25" }}
                  subtitle={orgs[org]["contacts"][0]["city"]}
                  avatar={orgs[org]["logo"]}
                  actAsExpander={true}
                  showExpandableButton={false}
                />
                <CardText className="BTNWrap">
                  <div className="BTN">
                    <ContactInfo orgContacts={orgs[org]["contacts"][0]} />
                  </div>
                </CardText>
                <CardMedia
                  className="TheExpandables4"
                  expandable={true}
                  overlay={<CardTitle title={orgs[org]["name"]}
                    subtitle={orgs[org]["contacts"][0]["web"]} />}
                >
                  <img src={orgs[org]["logo"]} alt="Company logo" width="300px" height="200px" />
                </CardMedia >
                <CardTitle className="TheExpandables4" title={orgs[org]["name"]} subtitle={orgs[org]["contacts"][0]["web"]} expandable={true} />
                <CardText className="TheExpandables4" expandable={true}>
                  {orgs[org]["description_company"]}
                </CardText>
              </Card>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const { orgs, orgsAfterFilter } = this.state
    if (Object.keys(orgsAfterFilter).length === 0) {
      return (<div>{this.renderOrgs(orgs)}</div>)
    }
    else {
      return (
        <div>{this.renderOrgs(orgsAfterFilter)}</div>
      )
    }
  }
}

export default Orgs