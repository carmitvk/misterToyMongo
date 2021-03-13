<template>
      <section v-if="toy" class="toy-preview">
        <p>{{toy.name}}</p>
        <p>{{toy.price}}</p>
        <p>{{toy.type}}</p>
        <p>{{toy.createdAtDate}}</p>
        <!-- <p>{{toy.creatorId}}</p> -->
        <!-- <p>{{toy.creatorFullName}}</p> -->
        <p v-if="toy.inStock">Is in stock</p>
        <p v-else>Is not in stock</p>
        <review-list :reviews="reviews" @remove="removeReview" />  
        <button><router-link :to="'/toy/' + toy._id + '/review/'">Add New Review</router-link></button>
        <button @click="goBack">Back</button>
    </section>
</template>

<script>
import {toyService} from '../services/toy.service.js'
import {reviewService} from '../services/review.service.js'
import reviewList from '../cmps/reviewList'
// import '../lib/moment.js' //???

export default {
    data() {
        return {
            toy:null,
            reviews:null,
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
            return toyService.getById(id)
            .then((toy)=>{
                return this.toy = toy
            })

            // const id = this.$route.params.toyId 

            // this.toy = this.$store.getters.toys.find((toy)=>{
            //         return toy._id===id
            // })        
        },
        loadReviews(toyId){
            this.$store.dispatch({ type: 'getReviewsByToyId', reviewIds: this.toy.reviewIds })
            .then((reviews)=>{
                console.log('toyDetaile reviews:',reviews)
                return this.reviews = reviews
            })
        },
        goBack(){
            this.$router.push('/toys')
        },
        removeReview(reviewId){
            this.$store.dispatch({ type: 'removeReview', reviewId })
            .then(() => {
                showMsg('review removed successfully')
            })
            .catch(err => {
                showMsg('Cannot remove review', 'danger')
            })
        }
    },
    watch: {
        '$route.params.toyId'(id) {
            console.log('Changed to', id);
            this.loadToy();
        }
    },
    created() {
        this.loadToy()
        .then(()=>{
            this.loadReviews(this.toy._id);
        })

    },
    components: {
        reviewList
    }
}
</script>

