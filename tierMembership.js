const User=require('./userModels.js')
const express=require('express')

const router=new express.Router()

router.post('/users',async(req,res)=>{
    const user=new User(req.body)
    try{
        await user.save()
        res.status(200).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})
router.post('/users/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        res.send(user)
    } catch(e){
        res.status(400).send()

    }
})
router.patch('/users/points',async(req,res)=>{
    const updatedPoints=Object.keys(req.body)
    try{
        
        await req.user.save()
        res.send(req.user)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
     }
 })