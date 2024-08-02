import React, { useState } from 'react'

export default function UploadPage() {

  let [formValues, setFormValues] = useState({
    artist: '',
    title: ''
  }) 

  let [uploadFile, setUploadFile] = useState(null)

  let handleChange = (e) => {
    e.preventDefault()
    console.log(e.target)
    setFormValues({...formValues, [e.target.name]: e.target.value})
    console.log(formValues)
  }

  let handleFile = (e) => {
    e.preventDefault()
    setUploadFile(e.target.files[0])
    console.log(e.target.files[0])
  }

  return (
    <div className="upload-page-container">
      <h1>Welcome to the upload page</h1>
      <p>Please select an upload method from the below:</p>
      <h2>First Method:</h2>
      <div>email us at email@wgnext.com with your song attached, and the title: title and artist: artist specified in the body</div>
      <div>please use the following template: some template:</div>
      <h2>Second Method:</h2>
      <div>add a song via our upload form</div>
      <form className="upload-form">
        <div className="field-container">
          <label htmlFor="artist">artist name:</label>
          <input type="text" id="artist" name="artist" placeholder="artist" value={formValues.artist} onChange={handleChange}></input>
        </div>
        <div className="field-container">
          <label htmlFor="title">track name:</label>
          <input type="text" id="title" name="title" placeholder="track name" value={formValues.title} onChange={handleChange}></input>
        </div>
        <div className="field-container">
          <label htmlFor="songFile">upload track (mp3 only)</label>
          <input type="file" id="songFile" name="songFile" value={formValues.songFile} onChange={handleFile}></input>
        </div>
      </form>
    </div>
  )
}
