# Child process in Node.js

> Node.js is a single-threaded language and uses the multiple threads in the background for certain tasks as I/O calls but it does not expose child threads to the developer.

> But node.js gives us ways to work around if we really need to do some work parallelly to our main single thread process.

> Child Process in Node: The child_process module gives the node the ability to run the child process by accessing operating system commands.

> The process has its own memory space on other hand, threads use the shared memory space. Thread is part of the process.

Node.js provides four ways to create child processes.

1. exec
1. execFile
1. spawn
1. fork

## Reference

- [How to handle Child Threads in Node.js](https://www.geeksforgeeks.org/how-to-handle-child-threads-in-node-js/)
