<template>
    <div>
        <user-msg></user-msg>
        <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/toys">Toys</router-link> |
        <router-link to="/about">About</router-link>|
        <router-link to="/dashboard">Dashboard</router-link>|
        <router-link to="/login">Login</router-link>
        </nav>
        <section className="loggedin-user" v-if="loggedInUser">
            <router-link :to="`/user/${loggedInUser._id}`">{{ loggedInUser.fullname }}</router-link>
            <!-- <span>{{ loggedInUser.score }}</span> -->
        </section>
    </div>
</template>

<script>
import userMsg from './userMsg'

export default {
    computed : {
        loggedInUser() {
            return this.$store.getters.loggedinUser
        },
        fullName(){
            return this.$store.getters.userForDisplay.fullname
        },
     
        computePrecents(){
            return `${this.percent}%`;
        },
        computeMax(){
            return this.$store.getters.toys.length
        },
        numDone(){
            return this.$store.getters.doneToysNum
        },
        percent(){
            return Math.ceil(this.$store.getters.doneToysNum/this.$store.getters.toys.length*100)
        },
    },

    components: {
        userMsg
    },
}
</script>


    // <header>
    //         <user-msg></user-msg>
    //         <span>Hello {{fullName}}</span>
    //     <div class="progress-container">
    //         <span>Done: {{computePrecents}}</span>
    //         <progress id="myBar" :value="numDone" :max="computeMax"> carmit </progress>
    //     </div>
    //     <nav>
    //         <router-link to="/">Home</router-link> | 
    //         <router-link to="/toy">Toys</router-link>|
    //         <router-link to="/user/profile">Profile</router-link>
    //     </nav>
    // </header>