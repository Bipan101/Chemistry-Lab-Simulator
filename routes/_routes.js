const express = require('express');
const app = express.Router();
const fs = require('fs');

app.use('/', require('./home').app)
app.get('/home', (req, res) => {res.redirect('/')})

const routes = fs.readdirSync('./routes').filter(file => 
    file.endsWith('.js') && 
    file !== __filename.slice(__dirname.length + 1)
);

app.get('/:routeName', async (req, res, next) => {
    if(!routes.find(route => route.slice(0, route.length-3) == req.params.routeName)){
        res.render('custom-page', {req, message: '404 | This page could not be found.', link: 'home'})
    }
    else next();
})

for(const route of routes){
    const _route = require(`../routes/${route}`);
    let routeName = route.slice(0, route.length-3);
    if(_route.app){
        app.use(`/${routeName}`, _route.app);
    }
    else{
        app.get(`/${routeName}`, (req, res) => {
            res.render('custom-page', {req, message: '404 | This page could not be found.', link: 'home'})
        })
    }
};

module.exports = {app};