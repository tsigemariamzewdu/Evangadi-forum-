const dbconnection =require("../db/dbconfig");
async function answer(req,res){
    const {answerText,questionId}=req.body;
    const {userid}=req.user;
    if(!answerText || !questionId){
        return res.status(400).json({msg:"please provide the answer"})

    }
    try {
        await dbconnection.query("INSERT INTO answers (userid,questionid,answer) VALUES (?,?,?)",[userid,questionId,answerText])
        return res.status(201).json({msg:"answer posted"})
        
    } catch (error) {
        console.error("error inserting question :",error)
        res.status(500).json({msg:"something went wrong fr"})

        
    }
    

}
async function allAnswers(req, res) {
    const questionId = req.params.questionId;  // Get questionId from request parameters

    if (!questionId) {
        return res.status(400).json({ msg: "Question ID is required" });
    }

    try {
        // SQL query to get the answers and the usernames of users who posted them
        const [rows] = await dbconnection.query(
            `SELECT 
                users.username, 
                answers.answer,
                answers.questionid
                
            FROM 
                answers
            JOIN 
                users
            ON 
                answers.userid = users.userid
            WHERE 
                answers.questionid = ?`, 
            [questionId]
        );

        // If no answers are found, return a message indicating so
       console.log(questionId)
        if (rows.length === 0) {
            return res.status(404).json({ msg: "No answers found for this question" });
        }

        // Return the fetched answers and usernames as a JSON response
        return res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching answers:", error);
        return res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
}


module.exports={answer,allAnswers}