import React from "react";
import { render } from "react-dom";

import {Router, Route, browserHistory, IndexRoute} from "react-router";

import store from './store';
import { Provider } from "react-redux";


import Home from "./containers/Home";
import Groups from "./containers/Groups";
import Gallery from "./containers/Gallery";
import Overview from "./containers/Overview";

render(
    <Provider store={store}>
       <Router history={browserHistory}>
            <Route path="/" component={Home} />
            <Route path="/groups/:text" component={Groups} />
            <Route path="/gallery/:groupid" component={Gallery} />
            <Route path="/overview/:groupid" component={Overview} />
        </Router>
    </Provider>,
 window.document.getElementById('app'));