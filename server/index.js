// 
// begin imports, requirements
// 

const express = require('express')
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(require('cors')())

const port = process.env.PORT || 4040

require('dotenv').config()

const mongoose = require('mongoose')
mongoose.set('debug', true)

const trackRoutes = require('./routes/trackRoutes')

// we will eventually need this stuff to connect to our deployment
// const path = require('path')
// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, '../client/build')));

//
// end imports, requirements
//

async function connecting() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/radio')
        console.log(`connected to the tracks db yee`)
    } catch(e) {
        console.log(e)
    }
}

app.use('/tracks', trackRoutes)

connecting().then(() => {
    app.listen(port, () => console.log(`🎙️🎙️🎙️ radio server running on port ${port}`))
})