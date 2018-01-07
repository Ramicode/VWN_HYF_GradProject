import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import { Responsive, WidthProvider } from 'react-grid-layout';
import RaisedButton from 'material-ui/RaisedButton';
import { BrowserRouter as Router } from 'react-router-dom'
import Route from 'react-router-dom/Route';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class LandingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
        }
    }

    componentWillMount() {
        this.setState({
            data: this.props.data
        })
    }

    // goTo = (e, toGo) => {
    //     this.props.history.push(`/${toGo}`)
    // }

    render() {
        const style = {
            // height: 100,
            // width: 100,
            margin: 20,
            textAlign: 'center',
            backgroundColor: '#e9e8e3'
            // display: 'inline-block',
        };
        const { data } = this.state
        return (
            <div>
                    <Route className="route" exact path="/" component={(props) => {
                        return (
                            <div>
                                <RaisedButton label="Login as an admin" onClick={() => props.history.push("/admin")} />
                                <RaisedButton label="Go to Homepage" onClick={() => props.history.push('/home')} />
                                <RaisedButton label="Add your organization" onClick={() => props.history.push("/add")} />

                            </div>
                        )
                    }} />
                <Route className="route" exact path="/" component={(props) => {
                    return(
                <ResponsiveReactGridLayout className="layout"
                layout={{ x: 1, y: 3, w: 3, h: 3 }}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 3, md: 3, sm: 3, xs: 3, xxs: 3 }}
                draggableCancel=".card"
                autoSize={false}
                verticalCompact={false}
                compactType='horizontal'
                preventCollision={true}
            >
                {Object.keys(this.props.data).map((org) => {
                    console.log(data[org])
                    return (
                        <div key={org}>
                            <Paper style={style} zDepth={1} circle={true} children={
                                <div>
                                    <Avatar src={data[org]["logo"]} size={100} />
                                    <h1>{data[org]["name"]}</h1>
                                </div>
                            } />
                        </div>
                    )
                }
                )}
            </ResponsiveReactGridLayout>
                    )
                }} />
            </div >
        )
    }
}
export default LandingPage