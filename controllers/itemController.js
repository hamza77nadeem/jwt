const express = require("express");
const app = express();
const path = require("path")
var bodyParser = require('body-parser')
const mongoose = require("mongoose")
const hbs = require('hbs');
const router = express.Router()

const itemModel = require('../models/itemModel.js')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

exports.createItem=(req, res)=>{
    console.log(req.body.itemname)

    const rsItems = new itemModel(req.body)
    rsItems.save().then(() => {
        console.log('Product Saved')
    }).catch((err)=>{
        console.log('Product Save Error..' + err)
    });
    res.render("home", {abc: req.body})  
    return true
}

exports.showAllItem=(req, res)=>{
    // model1.find({itemname: { $in: ['Text1', 'Text2'] }}, (err, data)=>{
        itemModel.find((err, data)=>{
        if(!err){
            // res.send(data)
            // res.send(202)
            res.render('items', {itemdata: data})
        }
        else{
            res.send("Data fetch Error ... " + err)
        }
    })
}

exports.findItem=(req, res)=>{
    // res.send( req.params.id )
    itemModel.findById({_id: req.params.id}, (err, data)=>{
        if (!err){
            // res.send(data)
            res.render("itemdetail", {itemdata: data})
        }
        else{
            res.send("Data fetch Error ... " + err)
        }
    })
}

exports.updateItem=async(req, res)=>{
    // res.send("PUT API Called ..... ")    
    await itemModel.findByIdAndUpdate({_id: req.params.id}, req.body, {        
    }).then((data)=>{
        res.send(data)
    }).catch((error)=>{
        res.send("Error Udpate API" + error)
    })
}

exports.deleteItem=async(req, res)=>{    
    await itemModel.findByIdAndDelete({
        _id: req.params.id        
    }).then((data)=>{
        res.send("Product Deleted....")
    }).catch((error)=>{
        res.send("Error Delete API" + error)
    })
}