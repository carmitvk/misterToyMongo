
import {httpService} from './http.service.js'
import { utilService } from './util.service.js'
import axios from 'axios' //CR from node modules also npm install

const KEY = 'reviewsDB';
const REVIEW_URL = 'review/'; //heroku


export const reviewService = {
    query,
    getById,
    remove,
    save,
    getEmptyReview,
    getReviewByIds,
    
}


// var gReviews = _createReviews()


function query() {
    return httpService.get(REVIEW_URL)
}


function getById(id) {
    return httpService.get(REVIEW_URL+ id)
}

function getReviewByIds(reviewIds){
    var params = new URLSearchParams(reviewIds.map(reviewId=>['reviewIds', reviewId])).toString();
    return httpService.get(REVIEW_URL + '?' + params)
}

function remove(id) {
    return httpService.delete(REVIEW_URL+ id)
}

function save(review) {
    if (review._id) {
        return httpService.put(REVIEW_URL+ review._id , review)
    } else {
        return httpService.post(REVIEW_URL , review)
    }
}

function getEmptyReview(fullName) {
    return {_id:utilService.makeId(), creatorFullName: '', creatorId: 0,
            txt: '',createdAt:0, rate: 0 }
}

// function _createReviews() {
//     var reviews = JSON.parse(localStorage.getItem(KEY))
//     if (!reviews || !reviews.length) {
//         reviews = [
//             _createReview({"_id": "t101", "name": "Talking Doll","price": 123,
//                         "type": "funny","createdAt": 1599873242736,"inStock": true }),

//             _createReview({"_id": "t102", "name": "Fire car","price": 444,
//                         "type": "funny","createdAt": 1599873242747,"inStock": false }),
//         ]
//         localStorage.setItem(KEY, JSON.stringify(reviews))
//     }
//     return reviews;
// }

// function _createReview(review) {
//     return {
//         // _id: utilService.makeId(),//??????????
//         ...review
//     }
// }

