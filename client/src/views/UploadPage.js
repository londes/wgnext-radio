import React, { useState } from 'react'
import { uploadToDropbox, getShareableData } from '../services/dropboxRequests'
import { addSong } from '../services/trackRequests'

export default function UploadPage() {

  let [formValues, setFormValues] = useState({
    artist: '',
    title: ''
  }) 

  let [uploadFile, setUploadFile] = useState(null)

  let handleChange = (e) => {
    e.preventDefault()
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    if (uploadFile) {
      console.log('in our upload file')
      let uploadData = await uploadToDropbox(uploadFile)
      console.log(uploadData)
      console.log('got our upload data')
      let shareRequest = await getShareableData(uploadData)
      console.log(shareRequest)
      let res = await addSong({...formValues, src: shareRequest.url})
      console.log(res)
    } else{} // todo: set message to file needed
  }

  let handleFile = (e) => {
    e.preventDefault()
    setUploadFile(e.target.files[0])
  }

  return (
    <div className="upload-page-container">
      <h1>Upload a track</h1>
      <p>Please select an upload method:</p>
      <h2>First Method:</h2>
      <div>email us at email@wgnext.com with your song attached, and the title: title and artist: artist specified in the body</div>
      <div>please use the following template: some template:</div>
      <h2>Second Method:</h2>
      <div>add a song via our upload form</div>
      <form className="upload-form" onSubmit={handleSubmit}>
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
        <button>submit</button>
      </form>
    </div>
  )
}
