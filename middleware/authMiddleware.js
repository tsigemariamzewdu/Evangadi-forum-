const jwt= require('jsonwebtoken')


async function authMiddleware (req,res,next){
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json ({msg:"authenticaton invalid "})
    }
    const token=authHeader.split(" ")[1]
    console.log(authHeader)
    console.log(token)

    try{
        const decoded=jwt.verify(token,"secret")
        const {username,userid}=decoded

        
        req.user={username,userid}
        next()

    }catch(error){
        return res.status(401).json ({msg:"authenticaton invalid "})

    }
}
module.exports=authMiddleware

//  so this middle ware is basically for authentication and to check the token but where are we supposed to use this middle ware is still the problem