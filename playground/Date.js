const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
 
  lastActiveAt:{ 
      type:String,
      required:true
  }
});
const User = mongoose.model('User', userSchema);
const user = new User({
  name: 'Jean-Luc Picard',
  lastActiveAt:new Date().getUTCFullYear()
});
console.log(user.lastActiveAt)
.setFullYear(new Date().getFullYear()+1)

const loginDate=new Date()
         if(user.anniversaryDate.getDate()>=loginDate.getDate()&&user.anniversaryDate.getMonth()>=loginDate.getMonth()&&user.anniversaryDate.getUTCFullYear()>login.getUTCFullYear()){
            if(user.MembershipPoints<1500){
                await user.replaceOne({MembershipPoints:0},{tier:'basic'},{anniversaryDate:anniversaryDate.setFullYear(anniversaryDate.getFullYear()+1)})
            }
             if(user.MembershipPoints<5000&&user.MembershipPoints>=1500){
                await user.replaceOne({MembershipPoints:0},{tier:'VIP'},{anniversaryDate:anniversaryDate.setFullYear(anniversaryDate.getFullYear()+1)})
            }
             if(user.MembershipPoints>=5000){
                await user.replaceOne({MembershipPoints:0},{tier:'Elite'},{anniversaryDate:anniversaryDate.setFullYear(anniversaryDate.getFullYear()+1)})
             }
            }
        res.status(200).send(user)

        setFullYear(new Date().getFullYear()+1)