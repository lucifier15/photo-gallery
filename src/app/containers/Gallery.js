import React from "react";
import {Link} from "react-router";
import { Header } from "../components/Header";

import styles from '../css/gallery.css';
import { connect } from "react-redux";

import { searchPoolPhotos } from '../actions/photos';

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

    componentDidMount() {
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

    searchPoolPhotos() {
        const { per, page, photos } = this.state; 
        this.props.dispatch(searchPoolPhotos(this.props.params.groupid,per,page)).then(() => {
            this.setState({
                photos: [...photos, ...this.props.photos],
                scrolling: false,
                totalPages: this.props.pages
            })
        });
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
        console.log(this.props)
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


//function to map global state to component
const mapStateToProps = (state) => {
    return{
        photos: state.photos,
        pages: state.pages
    };
}

//connects React Component to Redux Store
export default connect(mapStateToProps)(Gallery);