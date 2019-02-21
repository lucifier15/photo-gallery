import React from "react";
import {Link} from "react-router";
import styles from '../css/groups.css';
import { Header } from "../components/Header";

import { searchGroups } from '../actions/groups';
import { connect } from "react-redux";


class Groups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: null
        };
        this.searchGroups = this.searchGroups.bind(this);
    }

    componentDidMount(){
        this.searchGroups();
    }

    searchGroups() {
        let text = this.props.params.text;
        let url = `https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=daf19e272b75ab9efd60c760ff54b996&text=${text}&format=json&nojsoncallback=1`;
        fetch(url).then(res => res.json()).then((result) => {
            this.setState({
                groups: result.groups.group
            })
        },
        (error) => {
                console.log(error)
            }
        )
    }

    renderGroupCard(){
        let { groups } = this.state;
        console.log(groups);
        return (groups) ? (
            <div>
                    <div>
                        <span>Groups</span>
                    </div><br />
                    {groups && groups.map((group,index)=>{
                        console.log(group)
                    let thumb_src = `http://farm${group.iconfarm}.staticflickr.com/${group.iconserver}/buddyicons/${group.nsid}.jpg`;
                    return (
                        <Link to={`/gallery/${group.nsid}`}  key={index}>
                        <div className="card col-md-4 col-xs-6">
                            <div className="col-md-4">
                                <img src={thumb_src} alt=".." />
                            </div>
                            <div className="col-md-8">
                                <div className="group-name ">{group.name}</div>
                                <div className="group-info">
                                    <span><i className="fa fa-users" aria-hidden="true" />  {group.members}</span>
                                </div>
                            </div>
                        </div>
                        </Link>
                    )
                    })}
             </div>
        ):(<center><div>Loading...</div></center>)
    }


    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    {this.renderGroupCard()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return{};
}

export default connect(mapStateToProps)(Groups);