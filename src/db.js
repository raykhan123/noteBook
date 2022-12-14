const mongoose =require("mongoose")
const mongooseUri= "mongodb+srv://danish123:Faizan123450@cluster0.sk9syp9.mongodb.net/notebook"
const connectToMongo =()=>{
    mongoose.connect(mongooseUri, {
        useNewUrlParser: true
    })
    .then(()=>console.log("mongoDB is connected"))
    .catch((error)=>console.log(error))
    
}
module.exports = connectToMongo