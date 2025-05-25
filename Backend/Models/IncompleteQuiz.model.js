import mongoose from "mongoose";

const incompleteQuizSchema = new mongoose.Schema(
    {
        User_id:{type:mongoose.Schema.Types.ObjectID,ref:"User"},
        Quiz_id:{type:mongoose.Schema.Types.ObjectID,ref:"Quiz"},
        Completed:{type:Number},
    }
)

const incompleteQuiz = new mongoose.model('IncompleteQuiz',incompleteQuizSchema)
export default {incompleteQuiz}