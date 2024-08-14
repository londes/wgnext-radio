import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigator() {
  return (
    <div className="navigation-bar">
        <Link to="/"><h2>Play Music</h2></Link>
        <Link to="/upload"><h2>Upload</h2></Link>
    </div>
  )
}
