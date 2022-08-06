const e = require("express");
const express = require("express");
const app = express();
const path = require("path")
var bodyParser = require('body-parser')
const mongoose = require("mongoose")
const hbs = require('hbs')
const bcrypt = require('bcrypt')

require('./database/db.js')
app.set('view engine', 'hbs');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// var aa = path.join(__dirname, "routes/routes.js")
// console.log (aa)

// app.use("/", require(aa))
app.use("/", require(path.join(__dirname, "routes/route")))

app.use(express.static(path.join(__dirname, "/public")))
const includepath = path.join(__dirname, "/views/include")
// console.log(includepath)
hbs.registerPartials(includepath)

app.use(urlencodedParser)
app.use(jsonParser)

//Bcrypt Example Code --------
// console.log('Bcrypt')
// var mypwd = "12345"
// var srnd = 10

// bcrypt.hash(mypwd, srnd, function(err, hash) {
//     // Store hash in your password DB.
//     console.log(hash)
// });
//-----------------------------

app.listen(8880, function(req, res){
    console.log('Your Server is Running at 8880');
})
