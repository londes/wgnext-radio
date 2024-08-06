import { URL } from '../config'

export async function uploadToDropbox(song) {
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

    if (response.ok) {
      let data = await response.json()
      console.log('file uploaded to dropbox successfully', data)
      return data
    } else {
      let errorResponse = await response.text()
      console.error('failed to upload file to dropbox', response.status, response.statusText, errorResponse);
    }
  }

export async function getShareableData(song) {
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

    if (response.ok) {
        let data = await response.json()
        console.log('shareable link generated successfully', data)
        return data
    } else {
        let errorResponse = await response.text()
        console.error('shareable link failed to generate', response.status, response.statusText, errorResponse);
    }
}