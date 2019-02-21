import React from "react";
import {connect} from "react-redux";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import {Home} from "./Home";
import {Gallery} from "./Gallery";
import {Groups} from "./Groups";
import {Overview} from "./Overview";


class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Home} />
                <Route path="/groups/:text" component={Groups} />
                {/* <Route path="/gallery/:groupid" component={Gallery} /> */}
                {/* <Route path="/overview/:groupid" component={Overview} /> */}

            </Router>
        );
    }
}

const mapStateToProps = () => {
    return {
    }
}

export default connect(mapStateToProps)(App);