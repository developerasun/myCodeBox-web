// connect socket.io in client
const socket = io()

// Grab form elements
const sendBtn = document.querySelector(".sendBtn")
const msg = document.querySelector(".msg")
const readMsg = document.querySelector(".readMsg")
const nickname = document.querySelector(".nickname")

// Fire socket message when button gets clicked
sendBtn.addEventListener("click", (e)=>{
    e.preventDefault()

    // emit 'chat' event to server. content is the object with
    // message, nickname properties
    socket.emit('chat', {
        message : msg.value, 
        nickname : nickname.value
    })
    msg.value = ""
} )

// Listen for the above event and render the object
socket.on('chat', (data)=>{
    readMsg.innerHTML += `<p>${data.nickname} : ${data.message}</p>`
})