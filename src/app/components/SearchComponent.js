import React from 'react';
import { Header } from './Header';

import { Gallery } from './Gallery';
import { Groups } from './Groups';

export class SearchComponent extends React.Component{

    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.state = {
            items: null
        };
    }

    componentWillMount(){
        this.search();
    }

    search(){
        let tags = 'dogs';
        // let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=86ed6b22b74ad67d7d66f976b18114c6&tags=${tags}&per_page=10&format=json&nojsoncallback=1&auth_token=72157689630251583-ff488298ebdf2b39&api_sig=5b070ab88a4bb73ea278f6fc730eee52`;
        let url = ` https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=4a58dee7a66735a9553881411724863e&text=apple&format=json&nojsoncallback=1&auth_token=72157676469229767-a5ed6d277878579c&api_sig=ce70a12ea98bfe5ec190ebcfc420692c`;
        fetch(url).then(res => res.json()).then((result) => {
            this.setState({
                items: result
            })
            // console.log(result);
        },
        (error) => {
                console.log(error)
            }
        )
    }

    renderResultComponent() {
        let { items } = this.state;
        if(items){
            switch('Groups'){
                case 'Gallery':
                return <Gallery
                        items={items} />
                break;

                case 'Groups':
                return <Groups 
                        items={items}/>
                break;

                case 'Overview':
                return <Overview />
                break;
            }
        }
        return <div>Loading..</div>
    }
    render() {
        return(
            <div>
                <Header />
                {this.renderResultComponent()}
            </div>
        )
    }
}