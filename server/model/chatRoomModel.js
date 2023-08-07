const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        participants: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
          ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ChatMessage', // Replace 'ChatMessage' with the name of your chat message schema
            },
        ],
    }
);

const ChatRoom = mongoose.model('ChatRoom',chatRoomSchema)
module.exports = ChatRoom;