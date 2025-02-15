import mongoose from 'mongoose';

const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:false,
        min:15
    },
    height:{
        type:Number,
        default: null
    },
    weight:{
        type:Number,
        default: null
    },
    activityLevel:{
        type:String,
        default: null
    },
    profileCompleted: {
        type: Boolean,
        default: false
      }

},{timestamps:true})

const userModel = mongoose.model("users",userSchema);
export default userModel;
