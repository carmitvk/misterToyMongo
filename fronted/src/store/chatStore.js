import {chatService} from '../services/chat.service.js'

export const chatStore = {
    state: {
        chatUsers:['Benny','Moti'],
        chatMsgs:[{userName:'Dani',text:'Are you here?',createdAt:'12-12-2003',toyId:'7777',id:'23'},
                  {userName:'yossi',text:'i am here',createdAt:'08-08-2006',toyId:'9999',id:'34'}
             ],
        typers:[],
        // toyId:null //???
    },
    getters: {
        chatUsers(state){
            return state.chatUsers;
        },
        chatMsgs(state){
            return state.chatMsgs;
        },
        typers(state){
            return state.typers;
        },
        // toyId(state){
        //     return state.toyId;
        // }

    },
    mutations: {
        addMsg(state, {msg}) {
            state.chatMsgs.push(msg);
        },

        setUsers(state, {data}) {//set all the users from the server
            state.chatUsers = data;
        },

        addTyping(state, {data}) {//set all the users from the server
            state.typers.push(data.userName);
        },

        removeTyping(state, {data}) {
            const index = state.typers.indexOf(data.userName);
            if (index > -1) {
                state.typers.splice(index, 1);
            }
        }
    },

    actions: {
        async sendMsg({commit}, {msg}) {
            try {
                await chatService.sendMsg(msg);
                // commit({ type: 'setMsgs', msg })
                // return msg;
            } catch (err) {
                console.log('chatStore: Error in sendMsg', err)
                throw err
            }
        },

        async userTyping({commit}, {data}) {
            try {
                await chatService.userTyping(data);
            } catch (err) {
                console.log('chatStore: Error in userTyping', err)
                throw err
            }
        },

        async setToyId({commit}, {data}) {
            try {
                console.log('toyID', data.toyId)
                await chatService.setToyId(data);
            } catch (err) {
                console.log('chatStore: Error in setToyId', err)
                throw err
            }
        },

        async initListeners({commit}) {
            try {
                console.log('initListeners')
                await this.dispatch({ type: 'setMsgListener'});
                await this.dispatch({ type: 'setUsersListener'});
                await this.dispatch({ type: 'setTypingListener'});
                
            } catch (err) {
                console.log('chatStore: Error in setMsgListener', err)
                throw err
            }
        },

        async setMsgListener({commit}) {
            try {
                console.log('setMsgListener')
                await chatService.getMsgListener(msg=>{
                 // emits only to sockets in the same room
                commit({ type: 'addMsg', msg })
                });
            } catch (err) {
                console.log('chatStore: Error in setMsgListener', err)
                throw err
            }
        },

        async setUsersListener({commit}) {
            try {
                console.log('setUsersListener')
                await chatService.getUsersListener(dataValue=>{
                    if(Object.keys(dataValue).length === 0){
                        dataValue = undefined
                    }
                    commit({ type: 'setUsers', data: dataValue })
                });
            } catch (err) {
                console.log('chatStore: Error in setUsersListener', err)
                throw err
            }
        },

        async setTypingListener({commit}) {
            try {
                console.log('setTypingListener')
                await chatService.getTypingListener(data=>{
                 // emits only to sockets in the same room
                commit({ type: 'addTyping', data })
                setTimeout(() => {
                    commit({ type: 'removeTyping', data })
                  }, 3000);
                });
            } catch (err) {
                console.log('chatStore: Error in setTypingListener', err)
                throw err
            }
        },

    }

}