const router = require('express').Router()
const {create, getCat, get, getOne, uploadImages, deleteOne} = require("../controllers/productCtrl")

router.get('/get', get)
router.get('/get/:category', getCat)
router.get('/get-one/:id', getOne)
router.post('/create', create)
router.delete('/delete-one', deleteOne)

module.exports = router