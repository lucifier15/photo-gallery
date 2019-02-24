import React from "react";
var PieChart = require("react-chartjs").Pie;
import _ from 'lodash';

import styles from '../css/overview.css';
import { Header } from "../components/Header";
import { connect } from "react-redux";

import { searchPoolPhotos, getPhotoComments, getPhotoLikes } from '../actions/photos';

class Overview extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            photosInfo: []
        };
        this.getPhotoInfo = this.getPhotoInfo.bind(this);
    }

    componentDidMount() {
        this.getPhotoInfo();
    }

    //get all photos likes/comments based on group id 
    getPhotoInfo() {
        this.props.dispatch(searchPoolPhotos(this.props.params.groupid,10,1)).then(() => {
            this.props.photos && this.props.photos.map((photo) => {
                this.props.dispatch(getPhotoComments(photo.id)).then((comments)=>{
                    this.props.dispatch(getPhotoLikes(photo.id)).then((likes) => {
                        this.setState({
                            photosInfo: this.state.photosInfo.concat({
                                id: photo.id,
                                comment_count: comments,
                                likes: likes
                            })
                        })
                    })
                });
            })
        });
    }

    renderPieChart() {
        let {photosInfo} = this.state;

        //top photos are decided on no of likes/favs
        let topPhotos = _.slice(_.orderBy(photosInfo,'likes','desc'),0,10);
        let restPhotos =  _.differenceWith(photosInfo,topPhotos,_.isEqual);
        
        var likesChartData = _.map(topPhotos,function(photo){
            return {
                value: photo.likes,  
                color:"grey",
                highlight: "#FF5A5E",
                label: 'Likes'
            }
        });
        var commentsChartData = _.map(topPhotos,function(photo){
            return {
                value: photo.comment_count,  
                color:"grey",
                highlight: "#FF5A5E",
                label: 'Comments'
            } 
        });

        return (photosInfo.length>0)?(
            <div>
                <div className="chart">
                        <center>
                            <div><h4>Likes Chart</h4></div>
                            <div>
                                <PieChart data={likesChartData} />
                            </div>
                        </center>
                </div>
                <div className="chart">
                        <center>
                            <div><h4>Comments Chart</h4></div>
                            <div>
                                <PieChart data={commentsChartData} />
                            </div>
                        </center>
                </div>
            </div>
            ):(<center><div>Loading...</div></center>)
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    {this.renderPieChart()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        photos: state.photos
    };
}

//Connect React Component to Redux Store
export default connect(mapStateToProps)(Overview);