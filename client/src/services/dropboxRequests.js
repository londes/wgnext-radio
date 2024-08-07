import { URL } from '../config'

export async function uploadToDropbox(song={}) {
    let formData = new FormData()
    formData.append('file', song)
    console.log('uplod to derpbox')
    try {
        const response = await fetch(`${URL}/dropbox/add`, {
          method: 'POST',
          mode: 'cors',
          body: formData
        });
    
        if (!response.ok) {
          throw new Error('failed to upload file');
        }

        const data = await response.json();
        // do something with response
        return data
      } catch (error) {
        console.error('error adding track to Dropbox', error);
        throw error;
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

// async function postToDropbox(url='', data={}) {
//     console.log('post to derpbox')
//     const res = await fetch(`${URL}/dropbox${url}`, {
//         method:"POST",
//         mode:"cors",
//         body: JSON.stringify(data),
//         headers: {
//             "Content-Type": 'application/json'
//         }
//     })
//     return res.json()
// }