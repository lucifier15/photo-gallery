import React from "react";
import {Link} from "react-router";
import { Header } from "../components/Header";

import styles from '../css/gallery.css';
import { connect } from "react-redux";

class Gallery extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            photos: [],
            per: 20,
            page:1,
            totalPages: null,
            scrolling: false
        };
        this.searchPoolPhotos = this.searchPoolPhotos.bind(this);
    }

    componentWillMount() {
        this.searchPoolPhotos();
        this.scrollListener = window.addEventListener('scroll', (e) => {
            this.handleScroll(e)
        })
    }

    handleScroll = (e) => {
        const { scrolling, totalPages, page} = this.state;
        if (scrolling) return
        if (totalPages <= page) return
        const lastDiv = document.querySelector('div.photo-container > div:last-child');
        const lastDivOffSet = lastDiv.offsetTop + lastDiv.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        var bottomOffset = 20;
        if(pageOffset > lastDivOffSet - bottomOffset) {
            this.loadMore()
        }
    }

    loadMore = () =>{
        this.setState(prevState => ({
            page: prevState.page +1,
            scrolling: true
        }),this.searchPoolPhotos)
    }

    searchPoolPhotos(){
        const { per, page, photos } = this.state;
        const url = `https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=daf19e272b75ab9efd60c760ff54b996&
        group_id=${this.props.params.groupid}&per_page=${per}&page=${page}&format=json&nojsoncallback=1`;

        fetch(url).then(res => res.json()).then((result) => {
            this.setState({
                photos: [...photos, ...result.photos.photo],
                scrolling: false,
                totalPages: result.pages
            })
        },
        (error) => {
                console.log(error)
            }
        )
    }

    renderItem(){
        let { photos } = this.state;
        return (photos.length>0)?(
            <div>
                <div className="container">{photos && photos.map((item,index)=>{
                            let img_src = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
                            return (
                                <Link to={`/overview/${this.props.params.groupid}`} key={index}>
                                    <div className="photo-container">
                                        <div className="info">
                                        </div> 
                                        <div className="col-xs-6 col-md-3">
                                            <a href="#" className="thumbnail">
                                            <img src={img_src} alt="..." />
                                            </a>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    )}
                </div>
            </div>
            ):(<center><div>Loading...</div></center>)
    }


    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="row">
                        {this.renderItem()}
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = () => {
    return{};
}

export default connect(mapStateToProps)(Gallery);