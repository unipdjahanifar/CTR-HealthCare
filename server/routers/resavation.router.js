const router = require('express').Router()
const User = require('../models/user.model')
const utils = require('../utils')
const resavaionController = require('../controllers/resavation.controller')

router.post('/', (req, res, next) => {
    if (req.body.date && req.body.clinicId) {
        next()
    }
    else {
        return res.status(400).json({
            message: 'Invalid request'
        })
    }
}, async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    const { email } = utils.verifyToken(token)
    const user = await User.findOne({ email })
    console.log(user)
    if (!user) {
        return res.status(400).json({
            message: 'User not found'
        })
    }
    if (!user.verified) {
        return res.status(400).json({
            message: 'User not verified'
        })
    }
    req.user = user
    next()
}, resavaionController.create)
router.get('/', async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const { email } = utils.verifyToken(token)
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({
            message: 'User not found'
        })
    }
    if (!user.verified) {
        return res.status(400).json({
            message: 'User not verified'
        })
    }
    req.user = user
    next()
}, resavaionController.getUserResavations)
router.delete('/:id', resavaionController.deleteReservation)

module.exports = router