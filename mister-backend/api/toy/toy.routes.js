const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {addToy, getToys, deleteToy,getToy,updateToy,addTheReview} = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getToys)
router.get('/:toyId', log, getToy)
// router.post('/',  requireAuth, requireAdmin, addToy)
router.post('/:toyId/review', addTheReview)
router.post('/',  addToy)
// router.put('/',  requireAuth, requireAdmin, updateToy)
router.put('/:toyId', updateToy)

// router.delete('/:toyId',  requireAuth, requireAdmin, deleteToy)
router.delete('/:toyId', deleteToy)

module.exports = router