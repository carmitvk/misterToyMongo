//npm i socket.io-client@2.2.0
import io from 'socket.io-client';


const BASE_URL = process.env.NODE_ENV === 'production'
    ? ''
    : '//localhost:3030'
var socket = io(BASE_URL);


export const chatService = {
    sendMsg,
    setToyId,
    userTyping,
    getMsgListener,
    getUsersListener,
    getTypingListener
}

function sendMsg(msg){
    return socket.emit('msg-text',msg)
}

function setToyId(data){
    return socket.emit('toyId', data)
}

function userTyping(data){
    return socket.emit('user-typing', data)
}

function getMsgListener(callback){
    return socket.on('msg-text', callback);
}

function getUsersListener(callback){
    return socket.on('user-list', callback);
}

function getTypingListener(callback){
    return socket.on('user-typing', callback);
}