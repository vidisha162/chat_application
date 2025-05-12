const express = require('express')
const app = express()
const socketIo = require('socket.io');
const http = require('http').createServer(app)
const path = require('path');
const PORT = process.env.PORT || 4000
http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));

})
//socket 
const io = require('socket.io')(http)
io.on('connection', (socket) => {
    console.log("connected....")
    // socket.on('mesage',(msg)=>{
    //     socket.broadcast.emit('message',msg)
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });
    
    })


