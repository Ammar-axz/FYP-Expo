import Attendance from '../../Models/Attendance.model.js'
import Class_Student from '../../Models/Class_Student.model.js'
import Classes from '../../Models/Classes.model.js'
import Contact from '../../Models/Contacts.model.js'
import IncompleteQuiz from '../../Models/IncompleteQuiz.model.js'
import Message from '../../Models/Message.model.js'
import Quiz from '../../Models/Quiz.model.js'
import QuizQuestions from '../../Models/QuizQuestions.model.js'
import Room from '../../Models/Room.model.js'
import Schedules from '../../Models/Schedules.model.js'
import User from '../../Models/Users.model.js'

import mongoose from 'mongoose'

async function AddUser(req,res,next){
    try
    {
        let check = await User.User.findOne({"Email":req.body.email},{"_id":1})
        if(!check)
        {
            let resp = await User.User.create(
                {
                    "Name":req.body.name,
                    "Email":req.body.email,
                    "Password":req.body.pass,
                    "Age":req.body.age,
                    "Gender":req.body.gender,
                    "Phone":req.body.phone,
                    "Role":req.body.role,
                    "pfp":`/Images/ProfilePictures/${req.file.filename}`
                }
            )
            res.send("Account Created Successfully")
            next()
        }
        res.send("Email Already Exists")
    }
    catch(error)
    {
        console.log(error.message);
        // res.send(error.message)
    }
}

async function UpdatePoints(req,res,next){
    try
    {        
                  // await User.User.findOne({"Email":req.body.email},{"Points":1})  both are correct syntax
        const user = await User.User.findOne({"_id":req.body.id}).select("Points")

        if(req.body.flag)
        {
            let resp = await User.User.updateOne({"_id":req.body.id},{ $set:{Points:user.Points+req.body.points}})
            const updatedPoints = await User.User.findOne({"_id":req.body.id}).select("Points")
            
            res.status(200).send(updatedPoints)
        }
        else
        {
            let resp = await User.User.updateOne({"_id":req.body.id},{ $set:{Points:user.Points-req.body.points}})
            const updatedPoints = await User.User.findOne({"_id":req.body.id}).select("Points")
            
            res.status(200).send(updatedPoints)
        }
    }
    catch(error)
    {
        console.log(error.message);
        // res.send(error.message)
    }
}
async function AddQuiz(req,res,next){

    try
    {
        let resp;
        let id_arr=[];
        console.log("ADD QUIZ CALLED");
        
        if(req.body.title == null || req.body.class == null || req.body.due_date == null || req.body.t_questions == null)
        {
            res.status(400).send("Missing required fields")
        }
        else
        {
            const questionPromises = req.body.questions.map(async(item)=> {
                resp = await QuizQuestions.QuizQuestions.create(
                    {
                        "Question":item.question,
                        "Answer_1":item.option_1,
                        "Answer_2":item.option_2,
                        "Answer_3":item.option_3,
                        "R_Answer":item.r_answer
                    })
                    id_arr.push(resp._id)
                    console.log(resp._id)  
                }
            )
            //wait for all promises to resolve before contnuing below code
            await Promise.all(questionPromises);
            
            let resp2 = await Quiz.Quiz.create(
                {
                    "Title":req.body.title,
                    "Class":req.body.class,
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
                classIds.push(new mongoose.Types.ObjectId(i.Class_id))
            ))
            console.log(classIds);
            
            const quizes = await Quiz.Quiz.find({"Class_id":classIds})
            console.log(quizes)
            let quiz = []
            await Promise.all(
            quizes.map(async(item,index)=>{
                const inc_quiz = await IncompleteQuiz.incompleteQuiz.findOne({$and:[{"User_id":req.body.user_id},{"Quiz_id":item._id}]})
                if(inc_quiz)
                {
                    // quizes[index].completed=inc_quiz.Completed
                    quiz[index] = {
                        quiz : item,
                        completed : inc_quiz.Completed
                    }
                }
                else
                {
                    quiz[index] = {
                        quiz : item,
                        completed : 0
                    }
                }
            })
            )
            res.status(200).send(quiz)
        }
        else
        {
            const quizes = await Quiz.Quiz.find({"Class_id":req.body.class_id})
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
        let question = await QuizQuestions.QuizQuestions.findOne({"_id":req.body.id})
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
        let questions = await QuizQuestions.QuizQuestions.find({"Quiz_id":req.body.Quiz_id})
        res.status(200).send(questions)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function getSchedule(req,res){
    try
    {
        let classes
        let classIds=[]
        if(req.body.role == 'Student')
        {
            classes = await Class_Student.Class_Student.find({"Student_id":req.body.user_id},{"Class_id":1,"_id":0})
            classes.map((i)=>(
                classIds.push(new mongoose.Types.ObjectId(i.Class_id))
            ))
        }
        else if(req.body.role == 'Teacher')
        {
            classes = await Classes.Classes.find({"Teacher_id":req.body.user_id},{"_id":1,"Class":1})
            classes.map((i)=>(
                classIds.push(new mongoose.Types.ObjectId(i._id))
            ))  
        }
        let schedule = await Schedules.Schedules.find({"Class_id":{$in:classIds}})
        
        res.status(200).send(schedule)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}
async function getScheduleForAttendance(req,res){
    try
    {
        let schedule = await Schedules.Schedules.find({"Class_id":req.body.class_id})
        
        res.status(200).send(schedule)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function getClasses(req,res){
    try
    {
        let classes
        if(req.body.role == 'Student')
        {
            classes = await Class_Student.Class_Student.find({"Student_id":req.body.user_id})
        }
        else if(req.body.role == 'Teacher')
        {
            classes = await Classes.Classes.find({"Teacher_id":req.body.user_id})
        }
        
        res.status(200).send(classes)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function getAttendance(req,res){
    try
    {
        let attendance
        
        attendance = await Attendance.Attendance.find({"Class_id":req.body.class_id, "Date" : req.body.date})
        
        res.status(200).send(attendance)
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
        const quiz = await IncompleteQuiz.incompleteQuiz.updateOne({$and:[{"User_id":req.body.user_id},{"Quiz_id":req.body.quiz_id}]},{$set:{Completed:req.body.completed}})
        if(quiz.matchedCount === 0)
        {
            const inc_quiz = await IncompleteQuiz.incompleteQuiz.create({
                "User_id":req.body.user_id,
                "Quiz_id":req.body.quiz_id,
                "Completed":req.body.completed
            })
        }
        res.status(200).send("updated successfully")
    }
    catch(err)
    {
        console.log(err);
    }
}

async function loginUser(req, res, next) {
    try {
        let user = await User.User.findOne({
            "Email": req.body.email,
            "Password": req.body.pass
        });

        if (user === null) {
            throw new Error("No User found");
        }

        res.status(200).send(user);
    } catch (err) {
        console.error("Login error:", err.message); // Log just the message
        res.status(400).send({ error: err.message }); // Send a readable error response
    }
}


function checkInput(req,res,next){
    if(req.body.name== "" || req.body.email== "" || req.body.pass== "" 
    || req.body.age== "" || req.body.gender== "" || req.body.phone== "")
    {
        res.status(400).send("Please fill all fields")
    }
    else{
        next()
    }
}

async function getAllUsers(req,res,next){
    try
    {
        let users = await User.User.find()
        
        res.status(200).send(users)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}
async function findUser(req,res,next){

    try
    {
        let user = await User.User.findOne({'_id':req.params.User})
        
        res.status(200).send(user)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}
async function SearchUser(req,res,next){

    try
    {
        if(req.body.username)
        {
        let user = await User.User.find({'Name':new RegExp(req.body.username)},{"pfp":1,"Name":1,_id:1})
        res.status(200).send(user)
        }
        else{
        res.status(200).send([])
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function addContact(req,res,next){
    try
    {
        let resp = await Contact.Contact.create(
            {
                "UserId1":req.body.id1,
                "UserId2":req.body.id2
            }
        )
        res.status(200).send(resp.message)
    }
    catch(error)
    {
        console.log(error.message);
        // res.status(400).send(error.name)
    }
    next()
}
async function getContacts(req,res,next){
    const socket = req.app.get('Socket')
    try
    {
        let currentUser = req.body.id
        let userToFind = ''
        let contacts = []
        let users = await Contact.Contact.find({$or:[{'UserId1':currentUser},
        {'UserId2':currentUser}]})
        
        await Promise.all(users.map(async(user,index) => {
            if(currentUser === user.UserId1.valueOf())
            {
                userToFind = user.UserId2.valueOf()
            }
            else if(currentUser === user.UserId2.valueOf())
            {
                userToFind = user.UserId1.valueOf()
            }
            contacts[index] = {
                contactId : await User.User.findOne({'_id':userToFind}),
                commonId : user._id
            }
            
            socket.join(user._id.valueOf())
        }))
        res.status(200).send(contacts)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function getGroups(req,res){
    const socket = req.app.get('Socket')
    try
    {
        let groupDetails = []
        let groups = await User.User.findOne({"_id":req.body.id},{"Groups":1,"_id":0})

        await Promise.all(groups.Groups.map(async(g,i)=>{
            groupDetails[i] = await Room.Room.findOne({"_id":g})
            socket.join(g.valueOf())
        }))

        res.status(200).send(groupDetails)
    }
    catch(err)
    {
        console.log(err)
        res.status(400).send("Error while fetching groups")
    }
}

async function getMessages(req,res,next){
    
    try
    {
        let currentUser = req.body.user
        let messages = await Message.Message.find({$and:[{"Type":false},
        {$or:[{'SenderId':currentUser},{ReceiverId:{$in:[currentUser]}}]}]})
        res.status(200).send(messages)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}
async function getGroupMessages(req,res,next){
    try
    {
        let currentUser = req.body.user
        let groupMessages = await Message.Message.find({$and:[{"Type":true},
        {ReceiverId:{$in:[currentUser]}}]})
        res.status(200).send(groupMessages)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function createGroup(req,res)
{
    let members = JSON.parse(req.body.members)
    let group = await Room.Room.create(
        {
            'RoomName':req.body.groupName,
            'pfp':`/Images/ProfilePictures/${req.file.filename}`,
            'Members':members
        }
    )
    await Promise.all(members.map(async(member)=>{
        await User.User.updateOne({'_id':member},{$push:{Groups:group._id}})
    })
    )
}

async function getGroupMembers(req,res){

    let members = []
    await Promise.all(req.body.map(async(member,i)=>{
        let temp = await User.User.find({"_id" : member})
        members[i] = temp[0]
    })
    )
    res.status(200).send(members)
}

export default {AddUser,AddQuiz,getQuizes,getQuizQuestion,getAllQuizQuestions,getSchedule,getClasses,UpdatePoints,addIncompleteQuiz,checkInput,getAllUsers,findUser,loginUser,SearchUser,addContact,getContacts,getMessages,getGroupMessages,createGroup,getGroups,getGroupMembers}


