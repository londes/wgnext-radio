import React, { useState } from 'react'
import { uploadToDropbox, getShareableData } from '../services/dropboxRequests'
import { addSong } from '../services/trackRequests'

export default function UploadPage({ tracks, setTracks }) {

  let [formValues, setFormValues] = useState({
    artist: '',
    title: '',
    filename: ''
  }) 

  let [uploadFile, setUploadFile] = useState(null)

  let [ message, setMessage ] = useState('')

  let handleChange = (e) => {
    e.preventDefault()
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    let regex = /^[A-Za-z0-9.,@#%$%&?!":; ()]*$/
    if (!uploadFile) {
      console.error('no file selected')
      setMessage('no file selected, please attach a file')
      return 
    }
    if (uploadFile.type !== 'audio/mpeg') {
      console.error('file must be an audio file')
      setMessage('file must be an audio file, please upload a mp3')
      return
    }
    else if (!regex.test(formValues.artist) || !regex.test(formValues.title)) {
      console.error('song information can only include letters, numbers, and punctuation')
      setMessage('title and artist may only contain numbers, letters, and punctuation')
      return
    } 
    // before we can upload to our db, we have to add to dropbox and get the song's share url to load it in our app
    try {
      setMessage('uploading file, please wait')
      console.log('uploading file to dropbox: ', uploadFile)
      let uploadData = await uploadToDropbox(uploadFile)
      console.log('song upload data is: ', uploadData)

      console.log('getting share info from dropbox')
      let shareRequest = await getShareableData(uploadData)
      console.log('song share data is: ', shareRequest)

      console.log('adding song to database')
      let { artist, title } = formValues
      let { url, name } = shareRequest
      let res = await addSong({...formValues, src: url, filename: name})
      if (res.ok) {
        console.log('song added: ', res)
        setTracks([...tracks, {artist: artist, title: title, src: url}])
        setMessage('song successfully uploaded to WGNext Radio!')
        setTimeout(()=>{
          setMessage('')
          setFormValues({
            artist: '',
            title: ''
          })
          setUploadFile(null)
          document.getElementById('songFile').value = '';
        }, 2000)
      } else {
        console.log(`error adding song: ${res.message}`)
        setMessage(`server error: ${res.message}`)
      }
    } catch (e) { 
      console.error('error handling upload: ', e)
      setMessage(`error uploading file: ${e.message}`)
    }
  }

  let handleFile = (e) => {
    e.preventDefault()
    setUploadFile(e.target.files[0])
  }

  return (
    <div className="upload-page-container">
      <div className="upload-page-details">
        <h1>Upload a track</h1>
        <p>Please select an upload method:</p>
      </div>
      <div className="upload-page-email">
        <h2>Email</h2>
        <div>email us at email@wgnext.com with your song attached, and the title: title and artist: artist specified in the body</div>
        <div>please use the following template: some template:</div>
      </div>
      <div className="upload-page-form">
        <h2>Form</h2>
        <div>add a song via our upload form:</div>
        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="field-container">
            <label htmlFor="artist">artist name:</label>
            <input type="text" id="artist" name="artist" placeholder="artist" value={formValues.artist} onChange={handleChange}></input>
          </div>
          <div className="field-container">
            <label htmlFor="title">track name:</label>
            <input type="text" id="title" name="title" placeholder="track" value={formValues.title} onChange={handleChange}></input>
          </div>
          <div className="field-container">
            <label htmlFor="songFile">upload track (mp3 only): </label>
            <input type="file" id="songFile" name="songFile" onChange={handleFile}></input>
          </div>
          <button>submit</button>
          <div className="form-message">{message}</div>
        </form>
      </div>
    </div>
  )
}
