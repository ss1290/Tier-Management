const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const moment=require('moment')
const userSchema=new mongoose.Schema({
  name:{
      type:String,
      required:true,
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
      default:moment().format()
  },
  anniversaryDate:{
    type:Date,
    default:moment().add(1,'years').format()
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
userSchema.methods.generateAuthToken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},"codemania")
    user.tokens=user.tokens.concat({token})
    await user.save() 
    return token
}
userSchema.statics.findByCredentials=async(email,password)=>{
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
userSchema.methods.updateTier=async function(){
    const user=this
    if(moment().isAfter(user.anniversaryDate)){
        if(user.MembershipPoints<1500){
            user.tier='BASIC',
            user.MembershipPoints=0
            user.anniversaryDate=moment(user.anniversaryDate).add(1,'years').format()
        }
        else if(user.MembershipPoints>=1500&&user.MembershipPoints<5000){
            user.tier='VIP',
            user.MembershipPoints=0
            user.anniversaryDate==moment(user.anniversaryDate).add(1,'years').format()
        }
        else if(user.MembershipPoints>=5000){
            user.tier='ELITE',
            user.MembershipPoints=0
            user.anniversaryDate==moment(user.anniversaryDate).add(1,'years').format()
        }
    }
    await user.save()
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

