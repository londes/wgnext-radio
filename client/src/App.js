import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navigator from './components/Navigator';
import PlayPage from './views/PlayPage';
import UploadPage from './views/UploadPage';
import { URL } from './config'


function App() {

  const [tracks, setTracks] = useState([])

  useEffect(() => {
    fetchTracks().then( tracks => setTracks(tracks) )
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Navigator/>
        <Routes>
          <Route path="/" element={<PlayPage tracks={tracks}/>}></Route>
          <Route path="/upload" element={<UploadPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

async function fetchTracks () {
  const res = await fetch(`${URL}/tracks`)
  if (!res.ok) {
    const message = 'error fetching tracks'
    throw new Error(message)
  }
  const tracks = await res.json()
  return tracks
}

export default App;
