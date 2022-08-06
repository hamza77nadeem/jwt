const e = require("express");
const express = require("express");
const app = express();
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')

mongoose.connect('mongodb://127.0.0.1:27017/testdb');
// mongoose.connect('mongodb+srv://pnypythonb10:12345@cluster0.fjcbvis.mongodb.net/?retryWrites=true&w=majority');

console.log("Connected....")    
mongoose.pluralize(null)

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
