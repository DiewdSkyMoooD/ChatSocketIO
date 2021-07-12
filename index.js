const express=require('express');
const app=express();
const path=require('path')
const SocketIO=require('socket.io');
const server=require('http').Server(app)
const io=SocketIO(server);

app.set('port',process.env.PORT|| 3000)
app.use(express.static(path.join(__dirname,'public')))

io.on('connection', (socket)=>{
    socket.broadcast.emit('welcome',{
        status:"someone more connect"
    })
    
    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data)
    })

    socket.on('typing',(data)=>{
        setTimeout(()=>{
          socket.broadcast.emit('typing',data)  
        },1000)
        
    })
    
    socket.on('disconnect',()=>{
        socket.broadcast.emit('bye',{
            status:'someone disconnected'
        })
    })
})

server.listen(app.get('port'),()=>{
    console.log("server on port", app.get('port'))
})