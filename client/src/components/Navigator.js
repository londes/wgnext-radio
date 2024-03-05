import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigator() {
  return (
    <div className="navigation-bar">
        <Link to="/">Play Music</Link>
        <Link to="/upload">Upload</Link>
    </div>
  )
}
