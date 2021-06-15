const mongoose=require('mongoose')
const User=require('./user')
const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        trim:true,
        required:true
    },
    productCost:{
       type:Number,
       required:true 
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    buyingDate:{
        type:Date,
        default:new Date()
    },
   TotalPoints:{
      type:Number,
      default:230
  }
})
productSchema.virtual('users',{
    ref:'User',
    localField:'owner',
    foreignField:'_id'
})
productSchema.virtual('Points',{
    ref:'User',
    localField:'TotaPoints',
    foreignField:'MembershipPoints'
})
productSchema.methods.toJSON=function(){
    const product=this
    const productObject=product.toObject()
    delete productObject.TotalPoints
    return productObject
}
productSchema.pre('save',async function(){
    const product=this
    product.TotalPoints=product.TotalPoints+product.productCost
})
productSchema.post('save',async function(){
    const product=this
    await User.findOneAndUpdate({_id:product.owner},{MembershipPoints:product.TotalPoints}) 
})
const Product=mongoose.model('Product',productSchema)


module.exports=Product
