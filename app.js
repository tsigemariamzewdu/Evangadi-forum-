require('dotenv').config()
const express = require("express")
const app=express()
const port=5500
const cors=require('cors')

app.use(cors())

//db connection
const dbconnection=require("./db/dbconfig")

// user route middleware file
const userRoutes=require("./routes/userRoute")

const questionRoutes=require("./routes/questionRoute")
const answerRoutes=require("./routes/answerRoute")
const authMiddleware = require("./middleware/authMiddleware")

//this one is to exract json data
app.use(express.json())

//user routes middleware
app.use("/api/user",userRoutes)
app.use("/api/questions",questionRoutes)
app.use("/api/answers",answerRoutes)

//question route middleware
async function start(){
try{
    const result=await dbconnection.execute("select 'test'")
    app.listen(port)
    console.log('database connection established')
    console.log(`listening on port ${port}`)
   
}
catch(error){
    console.log(error.message)

}}
start()

