const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require("express-handlebars").engine
// import { engine } from 'express-handlebars';
const app = express()
app.use(express.static(path.join(__dirname+'/public')))
app.use(morgan('combined'))
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
// XMLHTTPRequest,fetch, axios, ajax
// Template engine
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
// console.log("Path: ",path.join(__dirname, 'resources/views'))
const port = 3009

//Import file index.js
const route = require('./routes')
// Routes inits
route(app)
// Action ---> Dispatcher ---> Function handler
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})