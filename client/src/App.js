import logo from './logo.svg';
import './App.css';

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navigator from './components/Navigator';
import PlayPage from './views/PlayPage';
import UploadPage from './views/UploadPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigator/>
        <Routes>
          <Route path="/" element={<PlayPage/>}></Route>
          <Route path="/upload" element={<UploadPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
