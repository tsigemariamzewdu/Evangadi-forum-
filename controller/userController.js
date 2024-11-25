//db connection
const dbconnection =require("../db/dbconfig")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


async function register(req,res){
    const {username,firstname,lastname,email,password}=req.body;
    if (!email|| ! password || !firstname|| !lastname|| !username){
        return res.status(401).json({msg:"please provide all required fields"})
    }
    try{
        const [user]=await dbconnection.query("select username,userid from users where username=? or email=?",[username,email])
        if (user.length>0){
            return res.status(400).json({msg:"user already registered"})
        }
        if(password.length <8){
            return res.status(401).json ({msg:'password must be at least 8 characters'})
        }
        
        //it is important to encrypt the password while registering so in here what i am trying to do is that to use bcrypt and to encrypt all the passwords in the database
        
        const salt=await bcrypt.genSalt(10)

        const hashedPassword=await bcrypt.hash(password,salt)
        await dbconnection.query("INSERT INTO users (username,firstname,lastname,email,password) VALUES (?,?,?,?,?)",[username,firstname,lastname,email,hashedPassword])
        return res.status(201).json({msg:"user created"})

    }catch(error){
        console.log(error.message)
        return res.status(500).json({msg:"something went wrong, try again later!"})
    }
}
async function login(req,res){
    const {email,password}=req.body;
    if(!email ||!password){
        return res.status(401).json({msg:"please enter all required fields"})
    }
    try{
        const [user]=await dbconnection.query("select username,userid ,password from users where email=?",[email])
        if(user.length==0){
            return res.status(401).json({msg:"invalid credential"})
        }
        // compare password
        const isMatch=await bcrypt.compare(password,user[0].password);
        if (!isMatch){
            return res.status(401).json({msg:"invalid credential"})
        }

        const username=user[0].username
        const userid=user[0].userid
        const token=jwt.sign({username,userid},process.env.JWT_SECRET,{expiresIn:"1d"})
        return res.status(200).json({msg:"user login successfull",token})

        


    }catch(error){
        console.log(error.message)
        return res.status(500).json({msg:"something went wrong, try again later!"})
    }
  
}
function checkuser(req,res){
    const username=req.user.username
    const userid=req.user.userid
    console.log("valid user")
    res.status(200).json({msg:"valid user",username,userid})
}
module.exports={register,login,checkuser}