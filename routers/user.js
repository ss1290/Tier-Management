const express=require('express')
const User=require('../models/user')
const Product=require('../models/product')
const auth=require('../auth')
const mongoose= require('mongoose')
const router=new express.Router()
router.post('/users',async(req,res)=>{
    const user=new User(req.body)
    try{
        await user.save()
        const token=await user.generateAuthToken()
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
        res.send({user,token})
        await user.save()
       
    }catch(e){
        res.status(400).send('Please enter right email or password')
        console.log(e)
    }
})
router.post('/products',auth,async(req,res)=>{
    const product=new Product({
        ...req.body,
        owner:req.user._id,
        TotalPoints:req.user.MembershipPoints,
        level:req.user.tier,
        expiryDate:req.user.anniversaryDate
    })
    try{
        await req.user.updated
        await product.save()
        res.status(201).send(product)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})
router.get('/users/me',auth,async(req,res)=>{
    await req.user.updated
    res.send(req.user)
})
router.get('/products',auth,async(req,res)=>{
    await req.user.updated
    const products=await Product.find({owner:req.user._id})
    res.send(products)
})
module.exports=router