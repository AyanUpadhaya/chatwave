const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

const http = require('http');
const {Server} =  require('socket.io');

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:['GET','POST'],
    }
});

// Middleware
app.use(bodyParser.json());
app.use(cors());
//connecting to mongodb
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log('DB connection successfull'))
.catch((err)=>console.log(err.message))

const PORT = process.env.PORT || 3000;

io.on("connection",(socket)=>{
    console.log('User connected ',socket.id)
    socket.on("send_message",(data)=>{
        socket.broadcast.emit("receive_message",data)
    })
})


server.listen(PORT,()=>{
    console.log("Server is running at ",PORT)
})