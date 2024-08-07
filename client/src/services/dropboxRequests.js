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
        

        console.log(response)
        console.log('brigglio')
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
    console.log(song)
    console.log(JSON.stringify({song}))
    console.log('shareable derpbox')
    try {   
        const response = await fetch(`${URL}/dropbox/getlink`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({song})
        })
        if (!response.ok) {
            throw new Error('failed to upload file');
        }
        const data = response.json();
        return data
    } catch (error) {
        console.error('error generating shareable link', error)
        throw error
    }
}
