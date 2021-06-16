const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
  name:{
      type:String,
      require:true,
      trim:true
  },
  email:{
      type:String,
      unique:true,
      required:true,
      trim:true,
      lowercase:true,
      validate(value){
          if(!validator.isEmail(value))
          throw new Error('Please provide a valid email address')
      }
  },
  password:{
      type:String,
      required:true,
      trim:true,
      validate(value){
          if(value.length<6){
              throw new Error('Please enter a password of more than 6 characters')
          }
      }
  },
  signupDate:{
      type:Date,
      default:new Date()
  },
  anniversaryDate:{
    type:Date,
    default:new Date().setFullYear(new Date().getFullYear()+1)
  },
  newMembershipPoints:{
      type:Number,
      default:230
  },
  tokens:[{
      token:{
          type:String,
          required:true
      }
  }],
    MembershipPoints:{
      type:Number,
      default:230
  },
    tier:{
        type:String,
        default:null
  }
})
userSchema.methods.toJSON=function(){
    const user=this
    const userObject=user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}
userSchema.methods.date=async function(){
    const date=new Date()
    return date
}
userSchema.methods.generateAuthToken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},'myfirstProgram')
    user.tokens=user.tokens.concat({token})
    await user.save() 
    return token
}
userSchema.statics.findByCredentials=async (email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error('Unable to login!')
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login!')
    }
    return user
}
userSchema.pre('save',async function(next){
    const user=this

    if(user.isModified('password')){
        user.password =await bcrypt.hash(user.password,8)

    }
   next()
 })
const User=mongoose.model('User',userSchema)

module.exports=User

