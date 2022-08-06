const express = require("express");
const app = express();
const path = require("path")
var bodyParser = require('body-parser')
const mongoose = require("mongoose")

const schema1 = new mongoose.Schema({
    itemname: {type: String, required: true},
    itemqty: Number,
    itemrate: Number,
    saleflag: String
})

const itemModel = mongoose.model('itemsmasters', schema1)
module.exports = itemModel

