const express = require("express");
const app = express();
const path = require("path")
var bodyParser = require('body-parser')
const mongoose = require("mongoose")
const hbs = require('hbs');
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieparser = require("cookie-parser")

const userModel = require('../models/userModel.js')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

exports.createUser=(req, res)=>{
    // console.log(req.body.itemname)
    const oldUser =  userModel.findOne({ username: req.body.username });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const rsUsers = new userModel(req.body)
    rsUsers.save().then(() => {
        console.log('User: ' + req.body.username + ' Saved')
    }).catch((err)=>{
        console.log('User Saved Error..' + err)
    });
    res.render("home", {abc: req.body})  
    // res.send("User Created ... ")
    return true
}

exports.loginUser= async (req, res)=>{    
    // console.log(req.body.username)
    // console.log(password)
    var password = req.body.password
    const findUser = await userModel.findOne({username: req.body.username})
    // console.log(findUser.username)    
    if (!findUser){                             
            res.send("User ID Not Found")
        }
    else {
        bcrypt.compare(req.body.password, findUser.password, function(err, result) {
            if (!result){
                // console.log('User Login Failed')
                res.send("User Login Failed")
            }
            else{
                console.log('User Login Successfully')

                const vToken = findUser.generateJWTToken()  
                res.cookie("node1", vToken)

                // console.log(vToken)
                res.render("home", {abc: req.body})
            }                
        });
    }        
}

