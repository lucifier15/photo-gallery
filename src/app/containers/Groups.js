import React from "react";
import {Link} from "react-router";
import styles from '../css/groups.css';
import { Header } from "../components/Header";

import { searchGroups } from '../actions/groups';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


class Groups extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.dispatch(searchGroups(this.props.params.text));
    }

    renderGroupCard(){
        let { groups } = this.props;
        return (groups.length>0) ? (
            <div>
                    <div>
                        <span>Groups</span>
                    </div><br />
                    {groups && groups.map((group,index)=>{
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

const mapStateToProps = (state) => {
    return {
        groups: state.groups,
    }
}


//Connects React Component to Redux Store
export default connect(mapStateToProps)(Groups);