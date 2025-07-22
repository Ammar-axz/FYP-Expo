import cors from 'cors'
import express from 'express'
import { createServer } from "http"
import mongoose from 'mongoose'
import multer from 'multer'
import { Server } from "socket.io"
import UserControllers from './Controllers/Users/User.controller.js'
import Message from './Models/Message.model.js'

mongoose.connect("mongodb+srv://ammar:ammar123@ilm-pro.jeilouv.mongodb.net/?retryWrites=true&w=majority&appName=ILM-Pro")

const Storage = multer.diskStorage({
    destination:function(req,file,cb){
        if(file.fieldname === "pfp")
        {
        return cb(null,"./Public/Images/ProfilePictures/")
        }
        else if(file.fieldname === "media")
        {
        return cb(null,"./Public/Media/")
        }
    },
    filename:function(req,file,cb){
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'),
        file.originalname.length);
        return cb(null,file.fieldname+'-'+Date.now()+'-'+Math.round(Math.random()* 1E9)+ext)
    }
})
const upload = multer({storage:Storage})

const app=express()
const port=5000
app.use(cors())
app.use(express.static('public'))
app.use(express.json())

const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: {
      origin: "http://localhost:5173"
    }
})

io.on('connection', (socket) => 
{
    app.set('Socket',socket)
    
    socket.on("message",async (msg,id)=>
    {
        io.to(id).emit("messageResponse",msg)
        await Message.Message.create(
            {
                "Id":msg.Id,
                "Type":msg.Type,
                "Text":msg.Text,
                "Sender":msg.Sender,
                "SocketId":msg.SocketId,
                "SenderId":msg.SenderId,
                "ReceiverId":msg.ReceiverId
            }
        )
    })
    
})
httpServer.listen(port,()=>{
    console.log(`Server running at port  ${port}`)
})

app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.get('/api/user/:User',UserControllers.findUser)

app.post('/api/search-user',UserControllers.SearchUser)

app.get('/api/getAllUsers',UserControllers.getAllUsers)

app.post('/api/getContacts',UserControllers.getContacts)

app.post('/api/getGroups',UserControllers.getGroups)

app.post('/api/Register',upload.single('pfp'),UserControllers.checkInput,UserControllers.AddUser)

app.post('/api/Login',UserControllers.checkInput,UserControllers.loginUser)

app.post('/api/addContact',UserControllers.addContact)

app.post('/api/getMessages',UserControllers.getMessages)

app.post('/api/getGroupMessages',UserControllers.getGroupMessages)

app.post('/api/createGroup',upload.single('pfp'),UserControllers.createGroup)

app.post('/api/getGroupMembers',UserControllers.getGroupMembers)

app.post('/api/addQuiz',UserControllers.AddQuiz)

app.post('/api/getQuizes',UserControllers.getQuizes)

app.post('/api/getQuizQuestion',UserControllers.getQuizQuestion)

app.post('/api/getAllQuizQuestions',UserControllers.getAllQuizQuestions)

app.post('/api/getSchedule',UserControllers.getSchedule)

app.post('/api/getClasses',UserControllers.getClasses)

app.post('/api/updatePoints',UserControllers.UpdatePoints)

app.post('/api/addIncompleteQuiz',UserControllers.addIncompleteQuiz)