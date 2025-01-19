const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
module.exports = {io}

let port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use('/assets', express.static('assets'));
app.use('/', require('./routes/_routes.js').app)

server.listen(port, () => {
    console.log(`Listening at port ${port}`)
})