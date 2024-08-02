import React from 'react'

// import { tracks } from '../data/tracks'

export default function PlayPage({ tracks }) {
  return (
    <div className="player-song-container">
      {tracks.map((track, idx) => <div className='track-container' key={idx}>
          <div>{track.title} by {track.artist}</div>
          <audio src={track.src} controls />
      </div>)}
    </div>
  )
}
