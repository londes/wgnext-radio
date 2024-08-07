// 
// begin imports, requirements
// 

const express = require('express')
const app = express()
const path = require('path')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(require('cors')())

const port = process.env.PORT || 4040

require('dotenv').config()

const mongoose = require('mongoose')
mongoose.set('debug', true)

const trackRoutes = require('./routes/trackRoutes')
const dropboxRoutes = require('./routes/dropboxRoutes')

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../client/build')));

//
// end imports, requirements
//

async function connecting() {
    try {
        // await mongoose.connect('mongodb://127.0.0.1/radio')
        await mongoose.connect(`mongodb+srv://wilpur-radio:${process.env.MONGO_PW}@cluster0.dq7qyg1.mongodb.net/`)
        console.log(`connected to the tracks db yee`)
    } catch(e) {
        console.log(`ERROR: could not connect to db. please ensure it's running`)
        console.log(e)
    }
}

app.use('/tracks', trackRoutes)
app.use('/dropbox', dropboxRoutes)

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

connecting().then(() => {
    app.listen(port, () => console.log(`🎙️ 🎙️ 🎙️ radio server running on port ${port} 🎙️ 🎙️ 🎙️`))
})