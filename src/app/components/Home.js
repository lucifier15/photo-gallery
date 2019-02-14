import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import styles from '../css/home.css';

export class Home extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="welcome-wrapper">
                    <center>
                        <div className="welcome-text"><h3>Welcome To Photo Gallery</h3></div>
                    </center>
                </div>
            </div>
        );
    }
}