const express = require("express")
const app=express()
const port=5500


//db connection
const dbconnection=require("./db/dbconfig")

// user route middleware file
const userRoutes=require("./routes/userRoute")

const questionRoutes=require("./routes/questionRoute")
const authMiddleware = require("./middleware/authMiddleware")

//this one is to exract json data
app.use(express.json())

//user routes middleware
app.use("/api/user",userRoutes)
app.use("/api/questions",authMiddleware,questionRoutes)

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

