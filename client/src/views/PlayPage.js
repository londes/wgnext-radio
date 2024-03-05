import React from 'react'

import { tracks } from '../data/tracks'

export default function PlayPage() {
  return (
    <div className="player-container">
        {tracks.map(track => <audio src={track.src} controls />)}
    </div>
  )
}
