const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const reviewService = require('./review.service')

async function getReviews(req, res) {
    try {
        var reviewIds=[];
        var reviews = [];
        if (Object.keys(req.query).length > 0) {
            reviewIds = req.query.reviewIds
            reviews = await reviewService.query(reviewIds)
        }
        res.send(reviews)
    } catch (err) {
        logger.error('Cannot get reviews', err)
        res.status(500).send({ err: 'Failed to get reviews' })
    }
}

async function deleteReview(req, res) {
    try {
        await reviewService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete review', err)
        res.status(500).send({ err: 'Failed to delete review' })
    }
}

//----------review-----
// _id
// creatorFullName
// creatorId
// txt
// createdAt
// rate(1 to 5)


async function addReview(req, res) {
    try {
        const { txt, rate} = req.body
        var review = { txt, rate }
        review.creatorId = req.session.user?._id
        review.creatorFullName = req.session.user?.fullname
        review.createdAt = Date.now()
        review = await reviewService.add(review)
        res.send(review)

    } catch (err) {
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

module.exports = {
    getReviews,
    deleteReview,
    addReview
}