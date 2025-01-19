const express = require('express');
const app = express.Router();
const functions = require('../functions')
const io = require('../server').io;

app.get('/', (req, res) => {
    res.render('home', {req, list: functions.list})
})

io.on('connection', (socket) => {

    socket.on('mix', async (data) => {

        io.emit('result', ['loading....', '#c7e0fd', 'loading...']);

        let reaction = await functions.mix.getChemicalReaction(data[0], data[1]);
        let color = await functions.mix.getColor(data[0], data[1]);
        let product = await functions.mix.getProduct(data[0], data[1]);

        io.emit('result', [reaction, color, product]);
        functions.ledControl(3, await functions.converToHex(color))
        // functions.lcdControl(3, text)
    })

    socket.on('change_color1', async (data) => {
        socket.emit('act_change_color1', functions.getColor(data))
        functions.ledControl(1, await functions.converToHex(functions.getColor(data)))
        // functions.lcdControl(1, text)
    })

    socket.on('change_color2', async (data) => {
        socket.emit('act_change_color2', functions.getColor(data))
        functions.ledControl(2, await functions.converToHex(functions.getColor(data)))
        // functions.lcdControl(2, text)
    })
})

module.exports = {app};