const express=require('express')
const mongoose= require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/tier-Management',{
     useNewUrlParser:true,
     useCreateIndex:true,
     useUnifiedTopology:true,
     useFindAndModify:false
})
const userRouter=require('./routers/user')
const port=3000
const app=express()
app.use(express.json())
app.use(userRouter)
app.listen(port,()=>{
    console.log('Server is up on port '+port)
})

