import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        Name:{type:String,required:[true,"Name is Required"]},
        Email:{type:String,required:[true,"Email is Required"]},
        Password:{type:String,required:[true,"Password is Required"]},
        Age:{type:Number,required:[true,"Age is Required"]},
        Gender:{type:String,required:[true,"Gender is Required"]},
        Phone:{type:Number,required:[true,"Phone is Required"]},
        Role:{type:String,required:[true,"Role is Required"]},
        pfp:{type:String,required:[true,"Picture is Required"]},
        Points:{type:Number}
    }
)

const User = new mongoose.model('User',userSchema)
export default {User}