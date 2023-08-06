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
        const {from,to} = req.body;
        const messages = await Messages.find({
            users:{
                $all:[from,to]
            }
        }).sort({updatedAt:1});

        const projectMessages = messages.map((msg)=>{
            return {
                fromSelf:msg.sender.toString() === from,
                message:msg.message.text
            }
        })
        return res.json(projectMessages)

    }catch(ex){
        next(ex)
    }
}

module.exports ={
    addMessage,
    getAllMessage
}