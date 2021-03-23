import React, { Component } from "react";
import SearchBar from '../components/search-bar';
import VideoList from './video-list';
import VideoDetail from '../components/video-detail';
import Video from '../components/video';
import axios from 'axios';

const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false";
const API_KEY = "api_key=5d3ea7738a292dc76fd52915c6b54cdd";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {movieList:{}, currentMovie:{}};
    }

    componentWillMount() {
        this.initMovies();
    }

    initMovies() {
        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
        .then((response) => {
            this.setState({movieList:response.data.results.slice(1,6), currentMovie:response.data.results[0], function() {
                this.applyVideoToCurrentMovie();
            }});
        });
    }

    applyVideoToCurrentMovie() {
        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`)
        .then((response) => {
            const youtubeKey = response.date.videos.results[0].key;
            let newCurrentMovieState = this.state.currentMovie;
            newCurrentMovieState.videoId = youtubeKey;
            this.setState({currentMovie: newCurrentMovieState});
        });

    }

    render() {
        const renderVideoList = () => {
            if (this.state.movieList.length >= 5) {
                return <VideoList movieList={this.state.movieList}></VideoList>
            }
        }
        return (
            <div>
                <div className="search_bar">
                    <SearchBar></SearchBar>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <Video videoId={this.state.currentMovie.videoId}></Video>
                        <VideoDetail title={this.state.currentMovie.title} 
                                     description={this.state.currentMovie.overview}></VideoDetail>
                    </div>
                    <div className="col-md-4">
                        {renderVideoList()}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;