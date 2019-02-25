import React from "react";
import {Link} from "react-router";
import styles from '../css/head-foot.css';

import { browserHistory } from "react-router";
import { searchGroups } from "../actions/groups";
import { connect } from "react-redux";import axios from 'axios';


export class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            groups: [],
            display: 'none'
        }
    }

    search() {
        let text = document.getElementById('search').value;
        browserHistory.push(`/groups/${text}`);
    }

    //search input autocomplete suggestions
    // getSuggestions(e) {
    //     console.log(e.target.value);
    //     if(e.target.value != ""){
    //         return axios.post(`https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=daf19e272b75ab9efd60c760ff54b996&text=${e.target.value}&format=json&nojsoncallback=1`)
    //         .then((result) => {
    //             result.data.groups.group.map((group)=>{
    //                 this.setState({
    //                     groups: result.data.groups.group,
    //                     display: 'block'
    //                 })
    //             })
    //         })
    //     }else{
    //         this.setState({
    //             groups: [],
    //             display: 'none'
    //         })
    //     }
    // }

    renderSuggestions() {
        let {groups} = this.state;
        return (groups.length>0)?(
            <ul className="suggestion-list" style={{display:this.state.display}}>
                {this.state.groups && this.state.groups.map((group,index)=>{
                return <li key={index}>{group.name}</li>
                })}
            </ul>
        ):null
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
                        <div className="autocomplete">
                            <input type="text" onChange={ (e) => {this.getSuggestions(e)}} id="search" className="form-control" placeholder="Search Groups" autoComplete="off" />
                            {/* {this.renderSuggestions()} */}
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