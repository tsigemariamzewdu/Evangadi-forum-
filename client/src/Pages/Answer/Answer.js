import React,{useState,useEffect} from 'react';
import axios from "../../axiosConfig"
import { useLocation } from 'react-router-dom'
import "./answer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


function Answer() {
    const location=useLocation();
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
        const {questionId,title,description}=location.state || {};
        const [answerText, setAnswerText] = useState("");
        const token = localStorage.getItem("token");
        async function handlePostSol(e){
            e.preventDefault();
            try {
                // it calls an axios for the fetch it is the same as the posting in the question thing excpet for some logic 

                const token = localStorage.getItem("token");
                await axios.post("/answers/postanswer",{
                   answerText,questionId
    
                },
            {
                headers:{
                    Authorization:`Bearer ${token}`
    
                }
            });
                alert("answer  posted successfully")
    
            }catch(error){
                console.error("error posting answers",error)
                alert("failed to post the answer .please try again")
                
            }
        }
        // eziga inorder to fetch all the answers from the community i am gonna be using use effect and the depenedency is gonna be the question id whenever the question id is changed we are supposed to fetch again so that is it 
        // it is gonna be a get request 


        useEffect(() => {
            // Check if questionId is present
            if (!questionId) return;
    
            const fetchAnswers = async () => {
                setLoading(true);
                setError(null); // Reset error before making the request
    
                try {
                    const response = await axios.get(`/answers/${questionId}/answers`,{
                        headers:{
                            Authorization:`Bearer ${token}`,
                        }
                    });
                    console.log(response.data)
                    setAnswers(response.data); // Update state with fetched answers
                } catch (err) {
                    setError("Failed to fetch answers.");
                    console.error("Error fetching answers:", err);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchAnswers();
        }, [questionId]);

    
  return (
    <div className='answer-container'>
        <div className='thefirst'>
            
            <h1>{title}</h1>
            <p> description :{description}</p>
            
            {/* here the question title and the description  */}
        </div>
        <div className='thesecond'>
            <h2>Answers from the community</h2>
            {answers.length === 0 ? (
                <p>No answers available for this question.</p>
            ) : (
                <ul>
                    {answers.map((answer, index) => (
                        <li key={index}>
                            {console.log(answer)}
                            <strong> <FontAwesomeIcon icon={faUser}/>{answer.username}:</strong> {answer.answer}
                        </li>
                    ))}
                </ul>
            )}
        </div>
        
       
        <div className='thethird'>
            <h2>Post your answer below !</h2>
                <form onSubmit={handlePostSol}>
                    <textarea 
                        placeholder="Enter your answer" 
                        value={answerText} 
                        onChange={(e) => setAnswerText(e.target.value)} // Update state on input
                    />
                    <button type="submit">Post your solution</button>
                </form>
            </div>
    </div>
  )
}

export default Answer