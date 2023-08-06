const Messages = require('../model/messageModel')

const addMessage = async(req,res,next)=>{
    try{
        const {from,to,message} = req.body;
        const data = await Messages.create({
            message:{text:message},
            users:[from,to],
            sender:from,
        })
        if(data) return res.json({msg:"Message added successfully",status:true})
        return res.json({msg:"Failed to add msg to db",status:false})
    }catch(ex){
        next(ex)
    }
}
const getAllMessage = async(req,res,next)=>{
    try{

    }catch(ex){
        next(ex)
    }
}

module.exports ={
    addMessage,
    getAllMessage
}