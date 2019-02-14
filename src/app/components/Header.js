import React from "react";
import {Link} from "react-router";
import styles from '../css/head-foot.css';

import { browserHistory } from "react-router";


export class Header extends React.Component {

    constructor(props){
        super(props);
    }

    search() {
        let text = document.getElementById('search').value;
        browserHistory.push(`/groups/${text}`);
    }
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link to={"/"}>
                        <a className="navbar-brand" href="#">Photo Gallery</a>
                    </Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <form className="navbar-form navbar-left" onSubmit={this.search}>
                        <div className="form-group">
                        <input type="text" id="search" className="form-control" placeholder="Search Groups" />
                        </div>
                    </form>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#">Login</a></li>
                        <li><a href="#">SignUp</a></li>
                    </ul>
                    </div>
                </div>
            </nav>
        ); 
    }
}