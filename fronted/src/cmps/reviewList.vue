<template>
 <ul class="review-list"> 
    <li v-for="review in reviews" :key="review._id" class="review-list-container"> 
        <review-preview :review="review" />
        <div class="actions-container">
                <!-- <button class="btn" @click="remove(review._id)">X</button>  -->
                <!-- <button class="btn"><router-link :to="'/review/'+review._id">Details</router-link></button> -->
                <!-- <button class="btn"><router-link :to="'/review/edit/'+review._id">Edit</router-link></button> -->
        </div>
        <hr/>
    </li>
</ul> 


              
</template>

<script>
import reviewPreview from './reviewPreview'

export default {
    props: ['reviews'],
    data(){
        return{
            previews:null
        }
    },
    methods: {
        remove(reviewId) {
            this.$emit('removeReview', reviewId)
        },
    },
    components:{
        reviewPreview
    },
    created() {
    //get previews by ids

    }
}
</script>
