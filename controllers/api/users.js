require('dotenv').config()
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
  // https://i.imgur.com/3quZxs4.png
  // Step 5 happens here
  try {
    // Once the user token has been created through a POST request, extract the raw token here and set as a variable
    const token = req.header('Authorization').replace('Bearer ', '')
    // Check the JWT signature and make sure it is valid using the SECRET key
    // https://i.imgur.com/IXByEPP.png
    const payloadFromJWT = jwt.verify(token, process.env.SECRET)
    const user = await User.findOne({ _id: payloadFromJWT._id })
    if (!user) {
      throw new Error()
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).send('Not authorized')
  }
}

exports.createUser = async (req, res) => {
  try{
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.json({ user, token })
  } catch(error){
    res.status(400).json({message: error.message})
  }
}

exports.loginUser = async (req, res) => {
  try{
    const user = await User.findOne({ email: req.body.email })
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
      res.status(400).send('Invalid login credentials')
    } else {
      // https://i.imgur.com/3quZxs4.png
      // This is accomplishing step 2
      const token = await user.generateAuthToken()
      res.json({ user, token }) // Sending the user and the token to the front-end
    }
  } catch(error){
    res.status(400).json({message: error.message})
  }
}

exports.updateUser = async (req, res) => {
  try{
    const updates = Object.keys(req.body)
    const user = await User.findOne({ _id: req.params.id })
    updates.forEach(update => user[update] = req.body[update])
    await user.save()
    res.json(user)
  }catch(error){
    res.status(400).json({message: error.message})
  }
  
}

exports.deleteUser = async (req, res) => {
  try{
    await req.user.deleteOne()
    res.json({ message: 'User deleted' })
  }catch(error){
    res.status(400).json({message: error.message})
  }
}