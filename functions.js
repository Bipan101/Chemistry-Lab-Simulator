require('dotenv').config();

const { SerialPort } = require('serialport');
const port = new SerialPort({ path: 'COM10', baudRate: 9600 });
port.on('open', () => {console.log('Arduino Board Connected')});

const axios = require('axios');
const API_KEY = process.env.OPENAI_API_KEY;
const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

module.exports = {
    serverPort: process.env.port || 3000,

    openAI: async (message) => {
        try {
            const response = await axios.post(
                API_ENDPOINT,
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: message }]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`
                    }
                }
            );
    
            return response.data.choices[0].message.content;
        } catch (error) {
            return error.response
        }
    },

    converToHex: async (color) => {
        let d = await module.exports.openAI(`give me a straight answer one word hex color e.g #FFF or #000 of ${color}`)
        return d;
    },

    mix: {
        getChemicalReaction: async (chemical1, chemical2) => {
            let d = await module.exports.openAI(`give me a straight answer of chemical reaction when you mix ${chemical1} and ${chemical2}`)
            return d;
        },

        getColor: async (chemical1, chemical2) => {
            let d = await module.exports.openAI(`give me a straight answer one word hex color e.g #FFF or #000 of product when you mix ${chemical1} and ${chemical2}`)
            return d;
        },

        getProduct: async (chemical1, chemical2) => {
            let d = await module.exports.openAI(`give me a straight answer one word name of the chemical product when you mix ${chemical1} and ${chemical2}`)
            return d;
        }
    },

    list: [
        ['Copper sulfate', 'blue'],
        ['Potassium permanganate', 'purple'],
        ['Ferric chloride', 'yellow'],
        ['Chromium trioxide', 'orange'],
        ['Nickel sulfate', 'green'],
        ['Potassium dichromate', 'orange'],
        ['Cobalt chloride', 'pink'],
        ['Lead iodide', 'yellow'],
        ['Iron(II) sulfate', 'green'],
        ['Iron(III) nitrate', 'yellow'],
        ['Sodium chromate', 'yellow'],
        ['Sodium dichromate', 'orange'],
        ['Silver nitrate', 'white'],
        ['Copper chloride', 'green'],
        ['Potassium ferricyanide', 'red'],
        ['Potassium ferrocyanide', 'yellow'],
        ['Manganese dioxide', 'black'],
        ['Methyl orange', 'orange'],
        ['Phenolphthalein', 'white'],
        ['Ammonium dichromate', 'orange'],
        ['Sodium thiosulfate', 'white'],
        ['Bromine', 'red'],
        ['Chlorine', 'green'],
        ['Iodine', 'purple'],
        ['Sulfur', 'yellow'],
        ['Zinc oxide', 'white'],
        ['Lead oxide', 'yellow'],
        ['Antimony trioxide', 'white'],
        ['Cobalt nitrate', 'red'],
        ['Prussian blue', 'blue'],
        ['Cadmium sulfide', 'yellow'],
        ['Copper(I) oxide', 'red'],
        ['Mercuric sulfide', 'red'],
        ['Uranium oxide', 'green'],
        ['Vanadium pentoxide', 'orange'],
        ['Zinc sulfide', 'white'],
        ['Calcium carbonate', 'white'],
        ['Manganese(II) sulfate', 'pink'],
        ['Bismuth nitrate', 'white'],
        ['Titanium dioxide', 'white'],
        ['Thymol blue', 'blue'],
        ['Bromothymol blue', 'blue'],
        ['Indigo carmine', 'blue'],
        ['Crystal violet', 'purple'],
        ['Eosin Y', 'pink'],
        ['Fluorescein', 'green'],
        ['Malachite green', 'green'],
        ['Rhodamine B', 'pink'],
        ['Methylene blue', 'blue']
    ],

    getColor: (chemicalName) => {
        for (let item of module.exports.list) {
            if (item[0].toLowerCase() == chemicalName.toLowerCase()) {
                return item[1];
            }
        }
        return false;
    },

    ledControl: (led, color) => {

        port.write(`LED:${String(led)}:${color}`, (err) => {
            if (err) {
                console.error("Error writing to serial port:", err);
            }
        });
    },

    lcdControl: (led, text) => {

        port.write(`LCD:${String(led)}:${text}`, (err) => {
            if (err) {
                console.error("Error writing to serial port:", err);
            }
        });
    },
}