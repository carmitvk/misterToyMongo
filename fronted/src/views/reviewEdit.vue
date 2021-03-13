

<template>
   <section v-if="reviewToEdit" class="review-edit app-main">
        <h3>{{title}}</h3>
        <form @submit.prevent="save">
            <!-- <input type="text" placeholder="Reviewer name" v-model="reviewToEdit.creatorFullName"> from connected user???-->
            <textarea class="review-txt" name="reviewTxt" rows="10" cols="100" v-model="reviewToEdit.txt"></textarea>
            <div class="rating">
                Rate: <el-rate v-model="reviewToEdit.rate"></el-rate>
            </div>
            <button>Save</button>
            <button @click="goBack">Cancel</button>
        </form>
    </section> 
</template>

<script>
import {reviewService} from '../services/review.service.js'
import { showMsg } from '../services/eventBus.service.js'

export default {
   data() {
        return {
            reviewToEdit: null,
            toyId:null,
        }
    },
    methods: {
        save() {
            this.$store.dispatch({ type: 'saveReview', reviewData :{toyId:this.toyId,review:this.reviewToEdit} })
            // .then(() => {
            //     showMsg('review was saved successfully');
            //     this.$router.push(`/toy/${this.toyId}`)
                
            // })
            // .catch(err => {
            //     showMsg('Cannot save review', 'danger')
            // })               
        },
        goBack(toyId){
            this.$router.push(`/toy/${this.toyId}`)
        }
    },
    computed: {
        title() {
            return this.reviewId ? 'Review Edit' : 'Review Add'
        },
        reviewId() {
            return this.$route.params.reviewid
        },
        // toyId() {
        //     return this.$route.params.toyId
        // }
    },
    created() {
        this.toyId = this.$route.params.toyId;
        if (this.reviewId) {//edit
            reviewService.getById(this.reviewId)
            .then((data)=>{
                // showMsg('getById processed successfully')
                var origReview =data;
                this.reviewToEdit = JSON.parse(JSON.stringify(origReview)); //copy
            })
            .catch(err => {
                showMsg('Cannot get current id to edit review', 'danger')
            })

        } else {
            this.reviewToEdit = reviewService.getEmptyReview();
            
        }
    }
}
</script>

