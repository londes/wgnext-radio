import { URL } from '../config'

export async function uploadToDropbox(song={}) {
    // create formData to encode our File (song)
    let formData = new FormData()
    formData.append('file', song)
    try {
        const response = await fetch(`${URL}/dropbox/add`, {
          method: 'POST',
          mode: 'cors',
          body: formData
        })
        if (!response.ok) {
          throw new Error('failed to upload file');
        }
        const data = await response.json();
        return data
      } catch (error) {
        console.error('error adding track to Dropbox', error);
        throw error;
    }
}

export async function getShareableData(song) {
    try {   
        const response = await fetch(`${URL}/dropbox/getlink`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({song})
        })
        if (!response.ok) {
            throw new Error(`${response.statusText} (song probably already exists)`);
        }
        const data = response.json();
        return data
    } catch (error) {
        console.error('error generating shareable link', error)
        throw error
    }
}

