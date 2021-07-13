const express=require('express')
const path=require('path')
const hbs=require('hbs')
const auth=require('../middleware/auth')
const mongoose=require('mongoose')
const User=require('../models/user')
const Product=require('../models/product')

mongoose.connect('mongodb://127.0.0.1:27017/Tier-Management',{
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

app.get('/signupUser',async(req,res)=>{
    if(!req.query){
        return res.send({error:'Fill all the fields first'})
    }
    const user=await new User(req.query)
    try{
        await user.save()
        const token=await user.generateAuthToken()
        console.log(token)
    res.send({
        message:"user created",
        name:user.name,
        email:user.email,
        password:user.password,
        token
    })
    }catch(error){
        res.send({
            error
        })
    }
})

app.get('/addUser',(req,res)=>{
    res.render('signup',{
        title:"Signup"
    })
})

app.get('',(req,res)=>{
    res.render('login',{
        title:"Login"
    })
})

app.get('/loginUser',async(req,res)=>{
    if(!req.query){
        return res.send({error:"please login first"})
    }
    try{
        const user=await User.findByCredentials(req.query.email,req.query.password)
        const token=await user.generateAuthToken()
        res.send({
            message:"login successful",
            name:user.name,
            email:user.email,
            password:user.password,
            token
        })
    }catch(error){
        res.send({error:"please check the credentials"})
        }
})
app.get('/profile',auth,async(req,res)=>{
    res.render('profile',{
        title:"My profile",
        name:req.user.name,
        email:req.user.email,
        membershipPoints:req.user.MembershipPoints
    })
})
app.get('/products',auth,async(req,res)=>{
    res.render('product',{
        title:'Add a product'
    })
})
app.get('/add',auth,async(req,res)=>{
    const product=await new Product({
        productName:req.query.productName,
        productCost:req.query.productCost,
        owner:req.user._id,
        TotalPoints:req.user.MembershipPoints
    })
    await product.save()
    res.send({
       productName:product.productName,
       productCost:product.productCost
    })
})
app.get('/all',auth,async(req,res)=>{
    const products=await Product.find({})
    res.render('showall',{
        products
    })
})

app.get('/logoutUser',auth,async(req,res)=>{
      try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send({status:"You are logged out"})
    }catch(error){
        res.send({error})
    }
})
app.listen(port,()=>{
    console.log('Server is up on port '+port)
})
   