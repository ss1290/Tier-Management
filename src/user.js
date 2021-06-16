const path=require('path')
const express=require('express')
const hbs=require('hbs')
const User=require('../models/user')
const Product=require('../models/product')
const mongoose= require('mongoose')
const auth=require('../auth')

mongoose.connect('mongodb://127.0.0.1:27017/tier-Management',{
     useNewUrlParser:true,
     useCreateIndex:true,
     useUnifiedTopology:true,
     useFindAndModify:false
})

const app=express()
const port=3000
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../views')

app.set('view engine','hbs')
app.set('views',viewsPath)

app.use(express.static(publicDirectoryPath))    

app.post('',async(req,res)=>{
    const user= new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    await user.save()
      res.send({
        user:user
      })
})
app.get('',async(req,res)=>{
    res.render('signup',{
        title:'Signup Page'
    })
})


app.listen(port,()=>{
    console.log('Server is up on port '+port)
})



