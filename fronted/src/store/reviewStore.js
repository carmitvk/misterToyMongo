import {reviewService} from '../services/review.service.js'
import {toyService} from '../services/toy.service.js'

export const reviewStore = {
    state: {
        reviews:[],
        loading:false,
    },
    getters: {
    },
    mutations:{
        removeStoreReview(state,  {payload} ) {
            const idx = state.reviews.findIndex(td => td._id === payload.toyId)
            state.reviews.splice(idx, 1)
        },
        setReviews(state, {payload} ) {
            state.reviews = [...payload]
        }
    },
    actions: {
        removeReview(contex, payload) {
            reviewService.remove(payload.reviewId)
                .then(removedReview => {
                    contex.commit({ type: 'removeStoreReview', payload });
                })
                .catch(err => {
                    console.log('Store: Cannot remove review', err);
                    throw new Error('Cannot remove review');
                })
        },
        
        saveReview(contex, {reviewData}){
            toyService.saveReview(reviewData)
            .then(review => {
                contex.commit({ type: 'saveStoreReview', reviewData });
            })
            .catch(err => {
                console.log('Store: Cannot save review', err);
                throw new Error('Cannot save review');
            })
        },
        getReviewsByToyId(contex, {reviewIds}) {
            var showLoading = true;
            contex.commit({ type: 'setLoadingState', isLoading:showLoading });
            return reviewService.getReviewByIds(reviewIds)
                .then(data => {
                    contex.commit({ type: 'setReviews', payload:data });
                    contex.commit({ type: 'setLoadingState', isLoading:false });
                    return data
                })
                .catch(err=>{
                    contex.commit({ type: 'setLoadingState', isLoading:false });
                    console.log('Store: Cannot load reviews..', err);
                    throw new Error('Cannot load reviews..');
                })
        },
    }
    
}

