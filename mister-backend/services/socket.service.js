
//npm i socket.io@2.2.0

const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');


var gIo = null
var gSocketBySessionIdMap = {};
var usersByToyMap = new Map(); // key=toyid, value=map(key=sessionID, value=userName)

function connectSockets(http, session) {
    gIo = require('socket.io')(http);

    const sharedSession = require('express-socket.io-session');

    gIo.use(sharedSession(session, {
        autoSave: true
    }));
    gIo.on('connection', socket => {
        // console.log('socket.handshake', socket.handshake)
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket
        // TODO: emitToUser feature - need to tested for CaJan21
        // if (socket.handshake?.session?.user) socket.join(socket.handshake.session.user._id)
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
            if (socket.handshake) {
                gSocketBySessionIdMap[socket.handshake.sessionID] = null
                var users = usersByToyMap.get(socket.toyId)
                if (users && socket.handshake.sessionID){
                    users.delete(socket.handshake.sessionID);
                }
                gIo.to(socket.toyId).emit('user-list', usersByCurrToyId.values() ) //  replace to regular array not map
            }
        })

        socket.on('toyId', data => {
            if (socket.toyId === data.toyId) return;
            if (socket.toyId) {
                socket.leave(socket.toyId)
                var users = usersByToyMap.get(socket.toyId)
                if (users && socket.handshake.sessionID){
                    users.delete(socket.handshake.sessionID);
                }
            }
            socket.join(data.toyId)
            // logger.debug('Session ID is', socket.handshake.sessionID)
            socket.toyId = data.toyId
            socket.userName = data.userName;

            var usersByCurrToyId = usersByToyMap.get(data.toyId);
            if (!usersByCurrToyId) {
                usersByCurrToyId = new Map();//key=userId, value=userName
                usersByToyMap.set(data.toyId, usersByCurrToyId);
            }
            var userName = usersByCurrToyId.get(socket.handshake.sessionID)
            if (!userName && userName !== data.userName){
                usersByCurrToyId.set(socket.handshake.sessionID, data.userName)
            }
            var users = [];
            for (const user of usersByCurrToyId.values()) {
                users.push(user);
            }
            gIo.to(socket.toyId).emit('user-list', users ) //  replace to regular array not map
        })


        socket.on('msg-text', msg => {
            // emits to all sockets:
            // gIo.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            msg.userName = socket.userName
            msg.createdAt = Date.now()
            gIo.to(socket.toyId).emit('msg-text', msg)
        })

        socket.on('user-typing', data => {
            // emits to all sockets:
            // gIo.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            gIo.to(socket.toyId).emit('user-typing', data)
        })

    })
}

function emit({ type, data }) {
    gIo.emit(type, data)
}

// TODO: Need to test emitToUser feature
function emitToUser({ type, data, userId }) {
    gIo.to(userId).emit(type, data)
}


// Send to all sockets BUT not the current socket 
function broadcast({ type, data }) {
    const store = asyncLocalStorage.getStore()
    const { sessionId } = store
    if (!sessionId) return logger.debug('Shoudnt happen, no sessionId in asyncLocalStorage store')
    const excludedSocket = gSocketBySessionIdMap[sessionId]
    if (!excludedSocket) return logger.debug('Shouldnt happen, No socket in map', gSocketBySessionIdMap)
    excludedSocket.broadcast.emit(type, data)
}


module.exports = {
    connectSockets,
    emit,
    broadcast
}



