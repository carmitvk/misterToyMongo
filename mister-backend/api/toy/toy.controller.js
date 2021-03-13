const toyService = require('./toy.service')
const logger = require('../../services/logger.service')
const reviewController = require('../review/review.controller')//TODO


async function getToys(req, res) {
    try {

        var filterBy;
        if (Object.keys(req.query).length > 0) {
            filterBy = {
                name: req.query.name || '',
                pageIdx: +req.query.pageIdx || 0,
                inStock: req.query.inStock === 'true',
                toyType: req.query.toyType || ['all'],
                sortBy: req.query.sortBy,
                pageSize: +req.query.pageSize,
            }
        }

        const allToys = await toyService.query()

        if (!filterBy) {
            res.send({ toys: allToys, totalNumOfToys: allToys.length });
        } else {
            const regex = new RegExp(filterBy.name, 'i')//i is case insensitive

            var toys = allToys.filter((toy) => {
                return ((!filterBy.name || regex.test(toy.name)) && (toy.inStock === filterBy.inStock||filterBy.inStock==='all') &&
                    ((filterBy.toyType.includes('all') || filterBy.toyType.includes(toy.toyType))))
            });

            toys.sort((toy1, toy2) => {
                if (filterBy.sortBy === 'name') {
                    return toy1.name.localeCompare(toy2.name)
                } else if (filterBy.sortBy === 'price') {
                    return toy1.price - toy2.price;
                }
            })
            var totalResult = toys.length;
            const startIdx = filterBy.pageIdx * filterBy.pageSize;
            toys = toys.slice(startIdx, startIdx + filterBy.pageSize)

            res.send({ toys: toys, totalNumOfToys: totalResult })
        }
    } catch (err) {
        logger.error('Cannot get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

async function getToy(req, res) {
    try {
        const toyId = req.params.toyId
        const toy = await toyService.getById(toyId)
        res.send(toy)
    } catch (err) {
        logger.error('Cannot get toy' + toyId, err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}


//-------toy-----
// _id: '', 
// name: '',
// price: 50,
// toyType: 'funny',
// createdAt: Date.now(), 
// inStock: true 
// imgName,
// creatorId : userId,
// creatorFullName:   // user.fullname
//  reviewIds:[]


async function addToy(req, res) {
    try {
        const {name, price, toyType, inStock, imgName } = req.body
        var toy = {name, price, toyType, inStock, imgName }
        toy.creatorId = req.session.user?._id
        toy.createdAt = Date.now()
        toy.reviewIds = []
        toy.creatorFullName = req.session.user?.fullname
        toy = await toyService.add(toy)
        res.send(toy)
    } catch (err) {
        logger.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }
}

async function addTheReview(req, res) {
    try {
        const toyId = req.params.toyId
        const toy = await toyService.getById(toyId)
        var review = await reviewController.addReview(req, res)
        toy.reviewIds.push(review)
        var savedToy = await toyService.update(toy)
        res.send(savedToy)
    } catch (err) {
        logger.error('Failed to add review to toy', err)
        res.status(500).send({ err: 'Failed to add review to toy' })
    }
}

// function getReviewsByToyId(req, res) {
//     try {
//         const toyId = req.params.toyId
//         const toy = await toyService.getById(toyId)
//         var review = await reviewController.addReview(req, res)
//         toy.reviewIds.push(review._id)// TODO update the reviewIds in toys database.

//         res.send(toy)

//     } catch (err) {
//         logger.error('Failed to add review to toy', err)
//         res.status(500).send({ err: 'Failed to add review to toy' })
//     }
// }

async function updateToy(req, res) {//update
    try {
        const { _id, name, price, toyType, inStock, imgName } = req.body
        const toy = { _id, name, price, toyType, inStock, imgName }

        savedToy = await toyService.update(toy)
        res.send(savedToy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}


async function deleteToy(req, res) {
    try {
        await toyService.remove(req.params.toyId)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete toy', err)
        res.status(500).send({ err: 'Failed to delete toy' })
    }
}


module.exports = {
    getToys,
    getToy,
    updateToy,
    addToy,
    deleteToy,
    addTheReview,
}