const express = require("express");
const app = express();
const path = require("path")
var bodyParser = require('body-parser')
const mongoose = require("mongoose")
const hbs = require('hbs');
const router = express.Router()
const cookieparser = require("cookie-parser")
const jwt = require("jsonwebtoken")

require('../database/db.js')

mongoose.pluralize(null)

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieparser())

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const itemModel = require('../models/itemModel.js')
const vItemController = require("../controllers/itemController.js")
const vUserController = require("../controllers/userController.js")

router.post("/", (req, res)=>{
    res.send("<h1>POST Function Called ... </h1>")
})

router.get("/", (req, res)=>{
    // res.send("<h1>GET Function Called ... </h1>")
    res.render("userlogin")
})

router.get("/reg", (req, res)=>{
    res.render("userRegister")
})

router.get("/login", (req, res)=>{
    res.render("userlogin")
})
// router.post("/api/save", urlencodedParser, (req, res)=>{
//     console.log(req.body)
// })

// router.get("/setcookie", (req, res)=>{
//     const token = jwt.sign("62e14bb5d1e9782229095ea7", "FULLSTACKWEBPNYTRAININGSMEANMERN")    
//     console.log(token)
//     res.cookie("jwttoken", token)
//     // console.log(req.signedCookies)
//     res.send(token)
//     const verify = jwt.verify(token, "FULLSTACKWEBPNYTRAININGSMEANMERN")
//     console.log(verify)
// })

router.post("/api/save", urlencodedParser, vItemController.createItem)
router.get("/api/all", vItemController.showAllItem)
router.get("/api/find/:id", vItemController.findItem)
router.put("/api/update/:id", vItemController.updateItem)
router.delete("/api/delete/:id", vItemController.deleteItem)

router.post("/api/usersave", urlencodedParser, vUserController.createUser)
router.post("/api/userlogin", urlencodedParser, vUserController.loginUser)


module.exports = router