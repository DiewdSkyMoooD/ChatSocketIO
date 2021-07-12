const socket=io(),
d=document,
$btn=d.getElementById('send'),
$message=d.getElementById('message')
let $messages=d.getElementById('messages'),
$fragment=d.createDocumentFragment(),
$actions=d.getElementById('actions')

$btn.addEventListener('click',()=>{
    if($message.value!==''){
        socket.emit('chat',{
        message:$message.value
    })
    $message.value="";  
    }
    
})

$message.addEventListener('keypress',()=>{
    socket.emit('typing',{
        status:"someone more is typing..."
    })
})

socket.on('chat',(data)=>{
    $actions.textContent='* *';
    let $message=d.createElement('p');
    $message.textContent=data.message;
    $fragment.appendChild($message);
    $messages.appendChild($fragment)
})

socket.on('typing',(data)=>{
    $actions.textContent=data.status;
    setTimeout(()=>{
        $actions.textContent='* *';
    },2500)
})

socket.on('welcome',(data)=>{
    $actions.textContent=data.status;
    setTimeout(()=>{
        $actions.textContent='* *';  
    },1000)
})

socket.on('bye',(data)=>{
    $actions.textContent=data.status; 
    setTimeout(() => {
        $actions.textContent = '';
    }, 1000)
    
})