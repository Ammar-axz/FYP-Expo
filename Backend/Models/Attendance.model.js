import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
    {
        Student_id:{type:mongoose.Schema.Types.ObjectID,required:[true,"Student id is Required"],ref:"Users"},
        Class_id:{type:mongoose.Schema.Types.ObjectID,required:[true,"Class id is Required"],ref:"Classes"},
        Schedule_id:{type:mongoose.Schema.Types.ObjectID,required:[true,"Schedule id is Required"],ref:"Schedules"},
        Date:{type:Date,required:[true,"Date is Required"]},
        Status:{type:Boolean,required:[true,"Status is Required"]}
    }
)

const Attendance = new mongoose.model('Attendance',attendanceSchema)
export default {Attendance}