const express = require("express");
const app = express();
const path = require("path")
var bodyParser = require('body-parser')
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const schema2 = new mongoose.Schema({
    username: {type: String, required: true},
    useremail: String,
    password: String,
    tokens: [{
        token: String
    }]
})

schema2.pre('save', async function(next){
    // var saltrange = bcrypt.genSalt(10)
    if(this.isModified("password")){
    var saltrange = 10
    this.password = bcrypt.hashSync(this.password, saltrange)
    next()
    }
})

schema2.methods.generateJWTToken = function(){
    try {
        var generatedtoken = jwt.sign({id: this._id}, "FULLSTACKWEBDEVELOPMENTMEANMERNBATCH")                
        // console.log(generatedtoken)
        this.tokens = this.tokens.concat({token: generatedtoken})
        this.save()       
        return generatedtoken    
    }
    catch(err){
        console.log(err)
        return "false"
    }
}


const userModel = mongoose.model('userModel', schema2)
module.exports = userModel

