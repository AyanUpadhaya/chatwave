

import { useEffect, useState } from 'react';
import './App.css'
import {io} from 'socket.io-client';
const socket= io.connect("http://localhost:3000/");

function App() {
  const [message,setMessage] = useState("");
  const [messageRecieved,setMessageRecieved] = useState('');
  const sendMessage =()=>{
    socket.emit("send_message",{message})
  }

  useEffect(()=>{
    socket.on("receive_message",(data)=>{
      setMessageRecieved(data.message)
    })
  },[])

  return (
    <>
      <div className='app'>
        <input type="text" name="" id="" placeholder='message' onChange={(e)=>setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send Message</button>
        <h3>{message}</h3>
        <h3>{messageRecieved}</h3>
      </div>
    </>
  )
}

export default App
