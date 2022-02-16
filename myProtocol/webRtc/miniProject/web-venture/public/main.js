const divSelectRoom = document.getElementById('selectRoom')
const divConsultingRoom = document.getElementById('consultingRoom')
const inputRoomNumber = document.getElementById('roomNumber')
const buttonGoRoom = document.getElementById('goRoom')
const localVideo = document.getElementById('localVideo')
const remoteVideo = document.getElementById('remoteVideo') 

let roomNumber, localStream, remoteStream, rtcPeerConnection, isCaller

const iceServers = {
    'iceServer' : [
        {'urls' : 'stun:stun.services.mozilla.com'},
        {'urls' : 'stun:stun.l.google.com:19302'}
    ]
}

const streamConstraints = {
    audio : true,
    video: true 
}