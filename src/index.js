const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const route = require("./routes/route")
const connectToMongo = require("./db")
const app = express()
const cors = require('cors')


app.use(cors())


app.use(bodyParser.json())
// connectToMongo()

// app.get('/',(req,res)=>{
// res.send("My name is Danish")
// })
mongoose.connect("mongodb+srv://danish123:Faizan123450@cluster0.sk9syp9.mongodb.net/notebook", {
    useNewUrlParser: true })
.then(() => console.log("mongoDB is connected"))
.catch((err) => console.log(err));



const port = process.env.PORT || 5000
app.listen(port, function () {
    console.log("app is running on the port" + port)
})

