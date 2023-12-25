const User = require('../models/userModel')
const Order = require('../models/orderModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')


const get = async (req, res) => {
  // const all = await User.deleteMany()
  const all = await User.find()
  res.send(all)
}

const register = async (req, res) => {
  const {name, email, password} = req.body
  try {
    const passwordHashed = await bcrypt.hash(password, 12)
    const user = {name, email, password: passwordHashed}
    const token = jwt.sign({user_id:user._id,email}, 'MettihewToken')
    user.token = token
    const register = await User.create(user)
    res.send(user)
  } catch (err) {
    throw new Error(err)
  }
}

const signIn = async(req, res) => {
  const {email, password} = req.body
  try {
    const theUser = await User.findOne({email})
    if(!theUser) return res.status(404).send("User not found")
    const thePassword = await bcrypt.compare(password, theUser.password) 
    // console.log(thePassword, password, theUser.password);
      if(!thePassword) return res.status(401).send("Username or password is wrong")
      if(theUser && thePassword){
          const token = jwt.sign({user_id: theUser._id, email}, 'MettihewToken', {expiresIn:"2h"}) //60 * 60
          theUser.token = token
          res.json(theUser)    
      }
  } catch (error) {
      throw new Error(error)
  }
}
const getOne = async(req, res) => {
  try {
const {id} = req.params    
    const findOne = await User.findById(id)
    res.json(findOne)
  } catch (error) {
    throw new Error(error)
  }
}

const addToCart = async(req, res) => {
  // const {bookId, userId, quantity} = req.body
  // const userCart = await User.findByIdAndUpdate(userId, {$push: {   cart: {bookId}, {new: true})
  // console.log(userCart);
  // res.send(userCart)
}


const createOrder = async (req, res) => {
   const { _id, name} = req.body
  const createOrder = await Order.create({user: {_id, name}, items:req.body.cart });
  console.log(createOrder);
  res.send(createOrder)
}
const getOrder = async (req, res) => {
  // const getOrders = await Order.deleteMany()
  const getOrders = await Order.find()
  res.send(getOrders)
}

const deleteFromCart = async(req, res) => {
  const {bookId, userId} = req.body
  // const userCart = await User.findByIdAndUpdate(userId, {$pull: {cart: bookId} }, {new: true})
  // console.log(userCart);
  // res.send(userCart)
}


const deleteAccount = async (req, res) => {
  const del = await User.findByIdAndDelete(req.body)
  res.send(del)
}

const image = async(req, res) =>{
  console.log('image');
  console.log(req.body);
  res.end()
}
const cart = async(req, res) =>{
  const {userId, userName, product, color, size} = req.body
  const cartPut = await User.findByIdAndUpdate(userId, {$push: {cart: {product, option: {color, size, quantity: 1}}, user: {userId, userName}}}, {new: true})
  console.log(cartPut);
  res.json(cartPut)
}


module.exports = { register, get, signIn, addToCart, deleteFromCart, createOrder, deleteAccount, image, cart, getOrder, getOne}
