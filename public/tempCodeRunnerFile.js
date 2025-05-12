const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
do{
    name =prompt("enter your name:");
}while(!name)
textarea.addEventListener('keyup',(e)=>{
    
    if(e.key==='enter'){
        sendMessage(e.target.value)
    }
})
textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { // Check for "Enter" key
        e.preventDefault(); // Prevent the default behavior (new line)
        sendMessage(e.target.value); // Send the message
        textarea.value = ''; // Clear the textarea after sending the message
    }
});
function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    //append
    appendMessage(msg,'outgoing')

    //send to server
    socket.emit('message',msg)

}
function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let classname = type
    mainDiv.classList.add(classname,'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
} 
//recieve message
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
})