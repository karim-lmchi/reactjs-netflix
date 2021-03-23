import React from 'react';
import { ProgressPlugin } from 'webpack';
import VideoListItem from '../components/video-list-item';

const VideoList = (props) => {
    const { movieList } = props;
    return  (
        <div>
            <ul>
                {
                    movieList.map(movie => {
                        return <VideoListItem key={movie.id} 
                                              movie={movie}
                                              callback={receiveCallback}></VideoListItem>
                    })
                }
            </ul>
        </div>
    );

    function receiveCallback(movie) {
        props.callback(movie);
    }
}


export default VideoList;