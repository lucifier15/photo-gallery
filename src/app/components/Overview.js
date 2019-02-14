import React from "react";
var PieChart = require("react-chartjs").Pie;
import _ from 'lodash';

import styles from '../css/overview.css';
import {Header} from './Header';

export class Overview extends React.Component {

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

    getPhotoInfo() {
        let url = `https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=daf19e272b75ab9efd60c760ff54b996&group_id=${this.props.params.groupid}&format=json&nojsoncallback=1`
        fetch(url).then(res => res.json()).then((result) => {
            let photos = result.photos.photo;
            {photos && photos.map((photo,index)=>{
                fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=daf19e272b75ab9efd60c760ff54b996&photo_id=${photo.id}&format=json&nojsoncallback=1`)
               .then(res => res.json()).then((info)=>{
                    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getFavorites&api_key=daf19e272b75ab9efd60c760ff54b996&photo_id=${photo.id}&format=json&nojsoncallback=1`)
                    .then(res => res.json()).then((favs)=>{
                        this.setState({
                            photosInfo: this.state.photosInfo.concat({
                                id: photo.id,
                                comment_count: info.photo.comments._content,
                                likes: favs.photo.person.length
                            })
                        })
                    })
                })
            })}
           
        },
        (error) => {
                console.log(error)
            }
        )
    }

    renderPieChart() {
        let {photosInfo} = this.state;

        //top photos are decided on no of likes/favs
        let topPhotos = _.slice(_.orderBy(photosInfo,'likes','desc'),0,10);
        let restPhotos =  _.differenceWith(photosInfo,topPhotos,_.isEqual);
        console.log(topPhotos[0]);
        console.log(restPhotos[0])
        
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