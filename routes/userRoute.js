const { get, register, signIn, addToCart, deleteFromCart,getOne, deleteAccount, image, cart, createOrder, getOrder } = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

const router = require('express').Router()

router.get('/get', get)
router.post('/up', register)
router.post('/in', signIn)
router.post('/get-one/:id', getOne)
router.put('/add-to-cart', addToCart)
router.post('/create-order', createOrder)
router.get('/get-orders', auth, getOrder)
router.put('/delete-from-cart', deleteFromCart)
router.post('/delete-account', deleteAccount)
// it could not delete with delete, I changed it to post

router.put('/upload-image', image)
router.put('/cart', cart)


module.exports = router