const mongoose =require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const NotesSchema = new mongoose.Schema({
    userId:{
        type:ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    tag:{
        type:String,
        default:'General',
    }
},{timestamps:true})

module.exports = mongoose.model('Notes',NotesSchema) 