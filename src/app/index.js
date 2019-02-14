import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import { SearchComponent } from './components/SearchComponent'
import {Home} from "./components/Home";
import {Gallery} from "./components/Gallery";
import {Groups} from "./components/Groups";
import {Overview} from "./components/Overview";


class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Home} />
                <Route path="/groups/:text" component={Groups} />
                <Route path="/gallery/:groupid" component={Gallery} />
                <Route path="/overview/:groupid" component={Overview} />

            </Router>
        );
    }
}

render(<App />, window.document.getElementById('app'));