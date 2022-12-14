const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const route = require("./routes/route")
const connectToMongo = require("./db")
const app = express()
const cors = require('cors')


app.use(cors())


app.use(bodyParser.json())
connectToMongo()

// app.get('/',(req,res)=>{
// res.send("My name is Danish")
// })
app.use('/',route)
app.listen(process.env.PORT || 5000,function(){
    console.log("express app is running on PORT " + (process.env.PORT || 5000))
})

