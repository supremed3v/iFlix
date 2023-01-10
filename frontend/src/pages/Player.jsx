import React from 'react'
import {useParams} from 'react-router-dom';

const Player = () => {
    const {id} = useParams();


  return (
    <div>
        <h1>Player</h1>
        <video controls crossOrigin='anonymous' autoPlay style={{
            width: "80vw",
            height:"60vw"
        }} >
            <source src={`http://localhost:8080/api/watch-movie/${id}`} type="video/mp4"/>
        </video>
    </div>
  )
}

export default Player