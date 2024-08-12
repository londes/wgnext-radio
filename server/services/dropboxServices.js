const fetch = require('node-fetch')
const querystring = require('querystring')

const REFRESH_TOKEN = process.env.DROPBOX_REFRESH_TOKEN
const CLIENT_ID = process.env.DROPBOX_CLIENT_ID
const CLIENT_SECRET = process.env.DROPBOX_CLIENT_SECRET

async function refreshAccessToken() {
    // refresh our token
    console.log(REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET)
    const response = await fetch('https://api.dropboxapi.com/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: REFRESH_TOKEN,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        })
    });


    // set the new token value
    console.log(response)
    const data = await response.json();
    console.log(data)
    if (data.access_token) {
        process.env.DROPBOX_ACCESS_TOKEN = data.access_token;
    }
    return data.access_token;
}

async function getAccessToken() {
    // if we have a token, use it
    let accessToken = process.env.DROPBOX_ACCESS_TOKEN;
    if (!accessToken) {
        // if we don't have a token, get a new one
        accessToken = await refreshAccessToken();
    }
    return accessToken;
}

async function uploadToDropbox(fileBuffer, fileName) {
    let accessToken = await getAccessToken()
    const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Dropbox-API-Arg': JSON.stringify({
                path: `/${fileName}`,
                mode: 'add',
                autorename: true,
                mute: false
            }),
            'Content-Type': 'application/octet-stream'
        },
        body: fileBuffer
    });

    console.log(response)
    if (!response.ok) {
        throw new Error('failed to upload file to Dropbox')
    }

    const data = await response.json()
    return data
}

async function createShareableLink(path) {
    const accessToken = await getAccessToken();
    const response = await fetch('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            path,
            settings: {
                access: "viewer",
                allow_download: true,
                audience: "public",
                requested_visibility: "public"
            }
        })
    });

    if (!response.ok) {
        throw new Error('Failed to create shareable link');
    }

    const data = await response.json();
    data.url = data.url.replace("dl=0", "raw=1");
    return data;
}

module.exports = {
    uploadToDropbox,
    createShareableLink
}

