// admin.js
import express from 'express'
import mongoose from 'mongoose'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'

// Register the AdminJS adapter
AdminJS.registerAdapter(AdminJSMongoose)

// Import your models
import Attendance from '../Models/Attendance.model.js'
import Class_Student from '../Models/Class_Student.model.js'
import Classes from '../Models/Classes.model.js'
import IncompleteQuiz from '../Models/IncompleteQuiz.model.js'
import Quiz from '../Models/Quiz.model.js'
import QuizQuestions from '../Models/QuizQuestions.model.js'
import Schedules from '../Models/Schedules.model.js'
import User from '../Models/Users.model.js'
import Courses from '../Models/Courses.model.js'

const db = await mongoose.connect("mongodb+srv://ammar:ammar123@ilm-pro.jeilouv.mongodb.net/?retryWrites=true&w=majority&appName=ILM-Pro")

//Create AdminJS instance
const adminJs = new AdminJS({
  rootPath: '/admin',
  dashboard:{component:null},
  resources: [
    {
      resource: User
    },
    {
      resource: Quiz
    },
    {
      resource: Attendance
    },
    {
      resource: Classes
    },
    {
      resource: QuizQuestions
    },
    {
      resource: Schedules
    },
    {
      resource: Class_Student
    },
    {
      resource: IncompleteQuiz
    },
    {
      resource: Courses
    }
  ],
  branding: {
    companyName: 'ILM PRO',
    // logo: logo, // or null to remove
    // favicon: 'https://yourdomain.com/favicon.ico',
    softwareBrothers: false, // removes "SoftwareBrothers" branding
  }
})



// const adminJs = new AdminJS({
//     databases: [db],
// })



//Add admin panel router with login
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    if (email === 'admin@example.com' && password === 'admin') {
      return { email }
    }
    return null
  },
  cookieName: 'adminjs',
  cookiePassword: 'some-secret-password',
},null,
{
    resave:false,
    saveUninitialized:false
}
)


export { adminJs, adminRouter }
