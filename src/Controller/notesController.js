const notesModel = require('../models/Note')
const userModel = require('../models/User')


const createNote = async (req,res)=>{
try {
    let data = req.body
    console.log(data)
    if(Object.keys(data).length==0){
        return res.status(400).send({status:false,msg:"plz provide the details"})
    }

 data.userId = req.tokenId
//  if(!userId) return res.status(400).send({status:false,msg:'plz provide userId'})
//  let checkingUser =await userModel.findById({_id:userId})
//  if(!checkingUser) return res.status(400).send({status:false,msg:"user dosen't exist"}) 
    const dataCreated = await notesModel.create(data)
    return res.status(201).send(dataCreated)
} catch (error) {
    return res.status(500).send({msg:error.message})
}
}

const getNotes = async (req,res)=>{
    try {
        let userId = req.tokenId 
    let check = await userModel.findById({_id:userId})
    if(!check) return res.status(400).send({status:false, msg:"user dose not exist"})
    let notes = await notesModel.find({userId:userId})
    if(!notes)return res.status(400).send({status:false,msg:"no notes found"})
    return res.status(200).send(notes)
    } catch (error) {
        return res.status(500).send({status:false,msg:error.message})
    }

 }

const updateNotes = async (req,res)=>{
    try {
        let data = req.body
        console.log(data)
        let notesId= req.params.id
        let tokenId = req.tokenId
        let notes = await notesModel.findById({_id:notesId})
        if(!notes) return res.status(404).send({status:false,msg:"notes not exist"})
        if(tokenId!==notes.userId.toString())return res.status(403).send({status:false,msg:"unauthorized"})
        let {title,description,tag} = data
        let filter={}
        if(title){
            filter.title= title
        }
        if(description){
            filter.description= description
        }
        if(tag){
            filter.tag= tag
        }

        let update = await notesModel.findOneAndUpdate({_id:notesId},{$set:filter},{new:true})
        return res.status(200).send({status:true,data:update})
    } catch (error) {
     return res.status(500).send({status :false,msg:error.message})   
    }
}


const deleteNotes = async (req,res)=>{
    try {
        let notesId= req.params.id
        let tokenId = req.tokenId
        let notes = await notesModel.findById({_id:notesId})
        if(!notes) return res.status(404).send({status:false,msg:"notes not exist"})
        if(tokenId!==notes.userId.toString())return res.status(403).send({status:false,msg:"unauthorized"})
        let doc = await notesModel.findByIdAndDelete(notesId)
        return res.status(200).send({status:true,msg:"deleted successfully",d:doc})
    } catch (error) {
     return res.status(500).send({status :false,msg:error.message})   
    }
}



module.exports.createNote = createNote
module.exports.getNotes = getNotes
module.exports.updateNotes = updateNotes
module.exports.deleteNotes = deleteNotes