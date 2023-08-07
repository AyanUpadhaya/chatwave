const ChatRoom = require('../model/chatRoomModel');

const createRoom = async(req,res,next)=>{
    try{
        const {name}=req.body;
        const chatRoom = new ChatRoom({name})
        await chatRoom.save()
        return res.json({msg:"Chat room created",status:true})
    }catch(ex){
        res.status(500).json({ error: 'Failed to create chat room' });
    }
}

const getAllRooms = async(req,res,next)=>{
    try{
        const chatRooms = await ChatRoom.find();
        res.json(chatRooms);
    }catch(ex){
        res.status(500).json({ error: 'Failed to get chat rooms' });
    }
    // res.json([{room_id:'one',name:'room one'},{room_id:'two',name:'room two'}])
}


module.exports ={
    createRoom,
    getAllRooms,
}