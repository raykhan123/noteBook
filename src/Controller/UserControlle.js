const userModel = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt") 
const createUser = async (req,res)=>{
try {
    let data = req.body
    console.log(data)
    if(Object.keys(data).length==0){
        return res.status(400).send({status:false,msg:"plz provide the details"})
    }
    let { name,email,password}=data
    let checkingEmail = await userModel.findOne({email:email})
    if(checkingEmail) return res.status(400).send({status: false, msg : "Email Already Exist."}) 
    let salt = await bcrypt.genSalt(10)
    data.password = await bcrypt.hash(password,salt)
    const dataCreated = await userModel.create(data)
    return res.status(201).send({status:true,data:dataCreated})
} catch (error) {
    return res.status(500).send({msg:error.message})
}
}


const userLogin = async (req,res)=>{
try {
    let data=req.body
    console.log(data)
if(Object.keys(data).length==0){
    return res.status(400).send({status:false,msg:"plz provide the details"})
}
let {email,password}= data
if(!email) return res.status(400).send({status:false,msg:"enter email"})
if(!password) return res.status(400).send({status:false,msg:"enter password"})
let validatingEmail = await userModel.findOne({email:email})
if(!validatingEmail){
    return res.status(409).send({status:false,msg:"invalid email"})
}
let decPass= await bcrypt.compare(password,validatingEmail.password)
if(!decPass) return  res.status(401).send({ error: "Invalid Password" });
let token =jwt.sign(
    {
        userId:validatingEmail._id,

   },
   "Notebook"
)
res.setHeader("x-api-key", token) 

return res.status(200).send({ status: true, data : {_id : validatingEmail._id , token: token} });

} catch (error) {
    return res.status(500).send({msg:error.message})
}
}
 const getUser = async (req,res)=>{
    try {
        let userId = req.tokenId 
    let check = await userModel.findById({_id:userId}).select({password:0})
    if(!check) return res.status(400).send({status:false, msg:"user dose not exist"})
    if(check) return res.status(200).send({status:true, msg:check})
    } catch (error) {
        return res.status(500).send({status:false,msg:error.message})
    }

 }


module.exports.createUser = createUser
module.exports.userLogin = userLogin
module.exports.getUser = getUser