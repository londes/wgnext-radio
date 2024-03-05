import React from 'react'

import { tracks } from '../data/tracks'

export default function PlayPage() {
  return (
    <div className="player-song-container">
        {tracks.map(track => <div className='track-container'>
            <div>{track.title} by {track.artist}</div>
            <audio src={track.src} controls />
        </div>)}
        {/* <div className="song-container">
            {tracks.map(track => <div>{track.title}, {track.artist}</div>)}
        </div>
        <div className="player-container">
            {tracks.map(track => <audio src={track.src} controls />)}
        </div> */}
    </div>
  )
}
