import React from "react";
import {connect} from "react-redux";
import { Header } from "../components/Header";
// import { Footer } from "./Footer";
import styles from '../css/home.css';

class Home extends React.Component {
    render() {
        return (
            <div>
                <Header />
                {/* {this.props.group.result} */}
                <div className="welcome-wrapper">
                    <center>
                        <div className="welcome-text"><h3>Welcome To Photo Gallery</h3></div>
                    </center>
                </div>
            </div>
        );
    }
}


//function to map global state to component
const mapStateToProps = () => {
    return {
    }
}

export default connect(mapStateToProps)(Home);