import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
    {
        Title:{type:String,required:[true,"Title is Required"]},
        T_Questions:{type:Number,required:[true,"T_Questions is Required"]},
        Quiz_Questions:[{type:mongoose.Schema.Types.ObjectID,required:[true,"Quiz Questions are required"],ref:"QuizQuestions"}],
    }
)

const Quiz = new mongoose.model('Quiz',quizSchema)
export default {Quiz}