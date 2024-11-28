const dbconnection =require("../db/dbconfig")
async function ask(req,res){
    const {title,description}=req.body;
    const {userid}=req.user;
    if(!title || !description){
        return res.status(400).json({msg:"please provide all required fields"})

    }
    try {
        await dbconnection.query("INSERT INTO questions (userid,title,description) VALUES (?,?,?)",[userid,title,description])
        return res.status(201).json({msg:"question  posted"})
        
    } catch (error) {
        console.error("error inserting question :",error)
        res.status(500).json({msg:"something went wrong fr"})

        
    }
    

}
async function allQuestions(req,res){
    
    try{
        const[rows]= await dbconnection.query(
            `SELECT 
                users.username, 
                questions.title, 
                questions.description,
                questions.id
            FROM 
                questions
            JOIN 
                users
            ON 
                questions.userid = users.userid`
        );
        return res.status(200).json(rows)
    }catch(error){
        console.error("error fetching questions:",error)
        return res.status(500).json({msg:"something went wrong",error:error.message})

    }


    // what i wanted to get is that the username the title and the description of the queston 
    
}
module.exports={ask,allQuestions}