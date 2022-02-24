# Learning Websocket Essentials
1. Websocket is a protocol between client(browser) and server, which is differentiated from HTTP protocol. **Both protocols are at OSI model layer 7 and rely on TCP at layer 4**. Since it is always open and bidirectional flow, it allows us to interact in real time. 

> WebSocket was first referenced as **TCPConnection in the HTML5** specification, as a placeholder for a TCP-based socket API.[9] In June 2008, a series of discussions were led by Michael Carter that resulted in the first version of the protocol known as WebSocket.

2. For example, Let's imagine different users from different browsers login in your chat application and send a message. Then the message is updated on other browsers(clients) through server. Unlike Ajax in HTTP, **clients in websocket do not have to make a request to server**. Uses of websockets are as follows :

- multiplayer games
- online drawing canvas
- real-time apps
- collaborative code editings

### Socket.io
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

#### Reserved events
On each side, the following events are reserved and should not be used as event names by your application:

- connect
- connect_error
- disconnect
- disconnecting
- newListener
- removeListener 

### Advantages and cautions
- the browser supports WebSocket (97% of all browsers in 2020)
- there is no element (proxy, firewall, ...) preventing WebSocket connections between the client and the server

- Socket.IO is NOT a WebSocket implementation.
- Socket.IO is** not meant to be used** in a background service, **for mobile applications**.

> The Socket.IO library keeps an **open TCP connection to the server**, which may result in **a high battery drain** for your users. Please use a dedicated messaging platform like FCM for this use case.

### How does socket io work?
> The client will try to establish a WebSocket connection if possible, and will fall back on HTTP long polling if not.

> WebSocket is a communication protocol which provides a full-duplex and low-latency channel between the server and the browser. More information can be found here.

> you can consider the Socket.IO client as a "slight" wrapper around the WebSocket API. 

### Understanding socket
![image-removebg-preview](https://user-images.githubusercontent.com/83855174/151097635-4f80dab2-fc6a-4142-87d7-09c03c4f708a.jpg)

A Socket is the fundamental class for interacting with the server. A Socket belongs to a certain Namespace (by default /) and uses an underlying Manager to communicate.

A **Socket is basically an EventEmitter** which sends events to — and receive events from — the server over the network.

```js
socket.emit("hello", { a: "b", c: [] });

socket.on("hey", (...args) => {
  // ...
});
```

### Rooms 
> A room is an arbitrary channel that sockets can join and leave. It can be used to broadcast events to a subset of clients:

![image-removebg-preview (1)](https://user-images.githubusercontent.com/83855174/151100018-d540a241-0b4d-4ad8-b8a5-f3c5c9ae66fd.jpg)

#### Joining and leaving
You can call join to subscribe the socket to a given channel:

```js
io.on("connection", (socket) => {
  socket.join("some room");
});
```

And then simply use to or in (they are the same) when broadcasting or emitting:

```js
io.to("some room").emit("some event");
```

To leave a channel you call leave in the same fashion as join.


## Reference 
- [NetNinja - ChatApp Ninja](https://www.youtube.com/watch?v=vQjiN8Qgs3c&list=PL-tV1f9Asb4giyEr2-LlLrsEHTkf0Geyr&index=1&t=11s)