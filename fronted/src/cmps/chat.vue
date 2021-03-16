<template>
  <section class="chat-container">
    <h3>Chat about this toy:</h3>
    <div v-if="!typers" class="chat-hdr" >{{chatUsers}}</div>
    <div v-else class="chat-hdr" >{{typers}} - typing ...'</div>
    <div class="chat-msgs">
        <div v-for="msg in msgs" :key="msg.createdAt" >
            <span class="chat-user-name">{{msg.userName}}:</span>
            <span>{{msg.text}}</span>
            <span>{{msg.createdAt}}</span>
        </div>

    </div>
    <form @submit.prevent="send">
      <input
        ref="txtInput"
        type="text"
        @input="debounce"
        placeholder="Chat here...."
        v-model="msg.text"
      />
      <button>Send</button>
    </form>
  </section>
</template>

<script>
export default {
  props: ["toyId"],
  data() {
    return {
      msg: {
        text: "",
        toyId: this.toyId,
        // userName:'',
        // createdAt: "",
      },

      timerId: null,
    };
  },
  computed: {
    chatUsers() {
        if(this.$store.getters.chatUsers){
            return this.$store.getters.chatUsers.toString()+' are connected'
        }
    },
    typers() {
         if(this.$store.getters.typers){
            return this.$store.getters.typers.toString()
        }
    },
    msgs(){
        return this.$store.getters.chatMsgs
    }
  },
  methods: {
      send(){
        this.$store.dispatch({type:'sendMsg', msg:this.msg})
        this.msg.text = '';
      },
    debounce() {
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.$store.dispatch({type:'userTyping', data: {userName: this.$store.getters.loggedinUser.fullname}})
      }, 500);
    },
  },
  created() {
      this.$store.dispatch({type:'setToyId' , data: {toyId :this.toyId, userName: this.$store.getters.loggedinUser.fullname}})
  },
};
</script>



