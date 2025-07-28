import IncompleteQuiz from '../Models/IncompleteQuiz.model.js'
import Quiz from '../Models/Quiz.model.js'
import QuizQuestions from '../Models/QuizQuestions.model.js'


async function AddQuiz(req,res,next){

    try
    {
        let resp;
        let id_arr=[];
        
        if(req.body == null || req.body.title == null || req.body.class_id == null || req.body.due_date == null || req.body.t_questions == 0)
        {      
            console.log(req.body)         
            res.status(400).send("Missing required fields")
        }
        else
        {
            const questionPromises = req.body.questions.map(async(item)=> {
                resp = await QuizQuestions.create(
                    {
                        "Question":item.question,
                        "Answer_1":item.option_1,
                        "Answer_2":item.option_2,
                        "Answer_3":item.option_3,
                        "R_Answer":item.r_answer
                    })
                    id_arr.push(resp._id)
                }
            )
            //wait for all promises to resolve before contnuing below code
            await Promise.all(questionPromises);
            
            let resp2 = await Quiz.create(
                {
                    "Title":req.body.title,
                    "Class_id":req.body.class_id,
                    "Class_Name":req.body.class_name,
                    "Due_Date":req.body.due_date,
                    "T_Questions":req.body.t_questions,
                    "Quiz_Questions":id_arr
                }
            )
            res.status(201).send("Quiz Added Successfully")
        }
    }
    catch(error)
    {
        console.log(error.message);
        // res.send(error.message)
    }
}
async function getQuizes(req,res){
    try
    {
        if(req.body.role == "Student")
        {
            let classIds = []
            req.body.class_id.map((i)=>(
                classIds.push(i.Class_id)
            ))
            
            const quizes = await Quiz.find({"Class_id":classIds})
            let quiz = []
            await Promise.all(
            quizes.map(async(item,index)=>{
                const inc_quiz = await IncompleteQuiz.findOne({$and:[{"User_id":req.body.user_id},{"Quiz_id":item._id}]})
                if(inc_quiz)
                {
                    // quizes[index].completed=inc_quiz.Completed
                    quiz[index] = {
                        quiz : item,
                        completed : inc_quiz.Completed,
                        correct : inc_quiz.Correct 
                    }
                }
                else
                {
                    quiz[index] = {
                        quiz : item,
                        completed : 0,
                        correct : 0
                    }
                }
            })
            )
            res.status(200).send(quiz)
        }
        else
        {
            const quizes = await Quiz.find({"Class_id":req.body.class_id})
            res.status(200).send(quizes)
        }

    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function getQuizQuestion(req,res){
    try
    {
        let question = await QuizQuestions.findOne({"_id":req.body.id})
        res.status(200).send(question)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function getAllQuizQuestions(req,res){
    try
    {
        let questions = await QuizQuestions.find({"Quiz_id":req.body.Quiz_id})
        res.status(200).send(questions)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function addIncompleteQuiz(req,res){
    try
    {
        const quiz = await IncompleteQuiz.updateOne({$and:[{"User_id":req.body.user_id},
            {"Quiz_id":req.body.quiz_id}]},{$set:{Completed:req.body.completed,Correct:req.body.correct}})
        if(quiz.matchedCount === 0)
        {
            console.log(req.body);
            
            const inc_quiz = await IncompleteQuiz.create({
                "User_id":req.body.user_id,
                "Quiz_id":req.body.quiz_id,
                "Completed":req.body.completed,
                "Correct":req.body.correct
            })
        }
        res.status(200).send("updated successfully")
    }
    catch(err)
    {
        console.log(err);
    }
}

export default {AddQuiz,getQuizes,getQuizQuestion,getAllQuizQuestions,addIncompleteQuiz}