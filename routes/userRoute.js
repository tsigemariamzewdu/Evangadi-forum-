const express=require("express");
const router=express.Router()
// auth middle ware
const authMiddleware=require("../middleware/authMiddleware")







//user controllers

const{register,login,checkuser}= require('../controller/userController')

router.post("/register",register)
    
    // login user
    router.post("/login",login)
        
    //check user
    router.get("/check",authMiddleware,checkuser)

    module.exports=router