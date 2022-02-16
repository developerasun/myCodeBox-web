# Learning Websocket Essentials
1. Websocket is a protocol between client(browser) and server, which is differentiated from HTTP protocol. **Both protocols are at OSI model layer 7 and rely on TCP at layer 4**. Since it is always open and bidirectional flow, it allows us to interact in real time. 

2. For example, Let's imagine different users from different browsers login in your chat application and send a message. Then the message is updated on other browsers(clients) through server. Unlike Ajax in HTTP, **clients in websocket do not have to make a request to server**. Uses of websockets are as follows :

- multiplayer games
- online drawing canvas
- real-time apps
- collaborative code editings

## Socket.io
Install socket.io library in both backend and front end. First, install it through npm.

```shell
$npm install socket.io -D
```

And then, require it in Node.js/Express

```javascript
const express = require('express')
const app = express()
const server = app.listen(3000, ()=>console.log("listening at port 3000"))
const socket = require('socket.io')
const io = socket(server)
```

## Reference 
- [NetNinja - ChatApp Ninja](https://www.youtube.com/watch?v=vQjiN8Qgs3c&list=PL-tV1f9Asb4giyEr2-LlLrsEHTkf0Geyr&index=1&t=11s)