const express=require('express')
const User=require('../models/user')
const Product=require('../models/product')
const auth=require('../auth')
const mongoose= require('mongoose')
const bodyParser=require('body-parser')
const router=new express.Router()
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/users',async(req,res)=>{
    const user=new User(req.body)
    const token=await user.generateAuthToken()
    try{
        await user.save()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send('Their is already an account with this email id')
        console.log(e)
    }
})
router.post('/users/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.sendFile(__dirname + '/products.html')
    }catch(e){
        res.status(400).send('Please enter right email or password')
        console.log(e)
    }
})
router.post('/products',auth,async(req,res)=>{
    const product=new Product({
        ...req.body
        .populate({
            owner:req.user._id,
            TotalPoints:req.user.MembershipPoints
        }).exec()
    })
    try{
        await product.save()
        res.status(201).send(product)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})
router.get('/users/me',auth,async(req,res)=>{
    res.send(req.user)
})
router.patch('/Users',async(req,res)=>{
    const Users=await User.find({})
    try{
        Users.forEach((user)=>{
        if(user.MembershipPoints<1500&&user.name==req.body.name){
            user.tier='basic',
            user.MembershipPoints=0
            user.anniversaryDate=user.anniversaryDate.setFullYear(user.anniversaryDate.getFullYear()+1)
        }
         if(user.MembershipPoints>=1500&&user.MembershipPoints<5000&&user.name==req.body.name){
            user.tier='VIP',
            user.MembershipPoints=0
            user.anniversaryDate=user.anniversaryDate.setFullYear(user.anniversaryDate.getFullYear()+1)
        }
         if(user.MembershipPoints>=5000&&user.name==req.body.name){
            user.tier='elite',
            user.MembershipPoints=0
            user.anniversaryDate=user.anniversaryDate.setFullYear(user.anniversaryDate.getFullYear()+1)
        }
    })
     res.status(200).send(Users)
    }catch(e){
        res.status(400).send(e)
        console.log(e)
    }
})
router.get('/users',async(req,res)=>{
    res.sendFile(__dirname + '/signup.html')
})
router.get('/users/login',async(req,res)=>{
    res.sendFile(__dirname + '/login.html')
})
router.post
module.exports=router