import mongoose from "mongoose";

<<<<<<< HEAD
const attendanceSchema = new mongoose.Schema(
    {
        Student_id:{type:mongoose.Schema.Types.ObjectID,required:[true,"Student id is Required"],ref:"User"},
        Class_id:{type:mongoose.Schema.Types.ObjectID,required:[true,"Class id is Required"],ref:"Classes"},
        Student_Name:{type:String,required:[true,"Student Name is Required"]},
        Day:{type:String,required:[true,"Day is Required"]},
        Date:{type:Date,required:[true,"Date is Required"]},
        Status:{type:Boolean,required:[true,"Status is Required"]}
    }
)
=======
const attendanceSchema = new mongoose.Schema({
  Student_id: {
    type: mongoose.Schema.Types.ObjectID,
    required: [true, "Student id is Required"],
    ref: "User",
  },
  Class_id: {
    type: mongoose.Schema.Types.ObjectID,
    required: [true, "Class id is Required"],
    ref: "Classes",
  },
  Student_Name: { type: String, required: [true, "Student Name is Required"] },
  Day: { type: String, required: [true, "Day is Required"] },
  Date: { type: Date, required: [true, "Date is Required"] },
  Status: { type: Boolean, required: [true, "Status is Required"] },
});
>>>>>>> cf9716e20fcbd0631038550ef0b782599628d889

const Attendance = new mongoose.model("Attendance", attendanceSchema);
export default Attendance;
