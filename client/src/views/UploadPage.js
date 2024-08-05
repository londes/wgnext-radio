import React, { useState } from 'react'

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
      let uploadData = await uploadToDropbox(uploadFile)
      let shareRequest = await getShareableData(uploadData)
    }
  }

  let handleFile = (e) => {
    e.preventDefault()
    setUploadFile(e.target.files[0])
  }

  let uploadToDropbox = async (song) => {
    let response = await fetch ('https://content.dropboxapi.com/2/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_DROPBOX_TOKEN}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: `/${song.name}`,
          mode: 'add',
          autorename: true,
          mute: false
        }),
        'Content-Type': 'application/octet-stream'
      },
      body: song
    })

    console.log(response)
    if (response.ok) {
      let data = await response.json()
      console.log('file uploaded to dropbox successfully', data)
      return data
    } else {
      let errorResponse = await response.text()
      console.error('failed to upload file to dropbox', response.status, response.statusText, errorResponse);
    }
  }

  let getShareableData = async (song) => {
    console.log(song)
    let response = await fetch ('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_DROPBOX_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path: song.path_lower,
        settings: {
          access: "viewer",
          allow_download: true,
          audience: "public",
          requested_visibility: "public"
        }
      }),
    })

    console.log(response)
    if (response.ok) {
      let data = await response.json()
      console.log('shareable link generated successfully', data)
      return data
    } else {
      let errorResponse = await response.text()
      console.error('shareable link failed to generate', response.status, response.statusText, errorResponse);
    }
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
