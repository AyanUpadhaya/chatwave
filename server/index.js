const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userRoutes = require("./routes/userRoutes")
const socket = require('socket.io')
require('dotenv').config();
const app = express();

const http = require('http');
const {Server} =  require('socket.io');

const server = http.createServer(app);


// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth',userRoutes)
app.use('/api/messages',require("./routes/messagesRoutes"))
app.use('/api/chatrooms',require("./routes/chatRoomRoutes"))


//connecting to mongodb
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log('DB connection successfull'))
.catch((err)=>console.log(err.message))

const PORT = process.env.PORT || 3000;

server.listen(PORT,()=>{
    console.log("Server is running at ",PORT)
})

const io = socket(server,{
    cors:{
        origin:"*",
        credentials:true,
    }
})

global.onlineUsers = new Map();
io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id)
    })

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message)
        }
    })
})
