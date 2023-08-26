import {Server} from 'socket.io';

const io = new Server(8000, {
    cors: {
        origin: '*',
    }
});
const users = {};

io.on('connection', (socket) => {
    socket.on('new-join', (name) => {
        // console.log('New user joined: ', name);
        users[socket.id] = name;
        socket.broadcast.emit('join', name);
    });
    socket.on('send', (message) => {
        socket.broadcast.emit('receive', { 
            name: users[socket.id], 
            message: message 
        });
    });
    socket.on("disconnect", () => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
});