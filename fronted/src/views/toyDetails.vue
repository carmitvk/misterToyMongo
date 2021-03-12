<template>
      <section v-if="toy" class="toy-preview">
        <p>{{toy.name}}</p>
        <p>{{toy.price}}</p>
        <p>{{toy.type}}</p>
        <p>{{toy.createdAtDate}}</p>
        <!-- <p>{{toy.creatorId}}</p> -->
        <!-- <p>{{toy.creatorFullName}}</p> -->
        <!-- <review-list :reviewIds="toy.reviewIds" @remove="removeReview" />  ???temp-->
        <!-- <button class="btn"><router-link :to="'/toy/'+toy._id">Reviews</router-link></button> -->
        <p v-if="toy.inStock">Is in stock</p>
        <p v-else>Is not in stock</p>
        <button @click="goBack">Back</button>
    </section>
</template>







<script>
import {toyService} from '../services/toy.service.js'
// import '../lib/moment.js' //???

export default {
    data() {
        return {
            toy:null,
        }
    },
    computed:{
        createdAtDate(){
            return this.toy.createdAt; //return moment(this.toy.createdAt).format('LLLL'); // how to include lib???
        }
    },
    methods: {
        loadToy() {
            const id = this.$route.params.toyId
            toyService.getById(id)//???? is ok to get here directly from service?
            .then((toy)=>{
                this.toy = toy
            })
            // this.toy = (this.$store.getters.toys)[id]
            // this.toy = this.$store.getters.getById(id)
            
        },
        goBack(){
            this.$router.push('/toys')
        }
    },
    watch: {
        '$route.params.toyId'(id) {
            console.log('Changed to', id);
            this.loadToy();
        }
    },
    created() {
        this.loadToy();
    }
}
</script>

