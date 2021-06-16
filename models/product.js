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
    },
    buyingDate:{
        type:Date,
        default:new Date()
    },
   TotalPoints:{
      type:Number,
      default:230,
    
  },
  level:{
      type:String,
      default:null,
     
    },
    expiryDate:{
        type:Date,
        default:new Date().setFullYear(new Date().getFullYear()+1)
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
productSchema.virtual('tier',{
    ref:'User',
    localField:'level',
    foreignField:'tier'
})
productSchema.virtual('closing date',{
    ref:'User',
    localField:'expiryDate',
    foreignField:'anniversaryDate'
})
productSchema.methods.toJSON=function(){
    const product=this
    const productObject=product.toObject()
    delete productObject.TotalPoints
    delete product.level
    delete product.expiryDate
    return productObject
}
productSchema.pre('save',async function(){
    const product=this
    product.TotalPoints=product.TotalPoints+product.productCost
})
productSchema.post('save',async function(){
    const product=this
    await User.findOneAndUpdate({_id:product.owner},{tier:product.level,MembershipPoints:product.TotalPoints, anniversaryDate:product.expiryDate}) 
})
productSchema.pre('save',async function(){
    const product=this
    if(product.buyingDate.getTime()>=product.expiryDate.getTime()){
        if(product.TotalPoints<1500){
            product.level='BASIC',
            product.TotalPoints=0
            product.expiryDate=product.expiryDate.setFullYear(product.expiryDate.getFullYear()+1)
        }
        else if(product.TotalPoints>=1500&&product.TotalPoints<5000){
             product.level='VIP',
             product.TotalPoints=0
             product.expiryDate=product.expiryDate.setFullYear(product.expiryDate.getFullYear()+1)
        }
        else if(product.TotalPoints>=5000){
            product.level='ELITE',
            product.TotalPoints=0
            product.expiryDate=product.expiryDate.setFullYear(product.expiryDate.getFullYear()+1)
        }
    }
})
const Product=mongoose.model('Product',productSchema)


module.exports=Product
