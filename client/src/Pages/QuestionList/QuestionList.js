import { useEffect, useState } from "react"; 
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGreaterThan, faUser } from "@fortawesome/free-solid-svg-icons";
import "./questionlist.css";

function QuestionList() {
  // State for storing questions
  const [questions, setQuestions] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/questions/all-questions', {
          headers: {
            Authorization: `Bearer ${token}`, // Fixed the string interpolation
          },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login"); // Redirect if unauthorized
        }
      }
    };

    fetchQuestions();
  }, [token, navigate]);

  return (
    <div>
      <ul className="ul-container">
        {questions.map((question) => (
          <div className="quest-container" key={question.id}> {/* Added the key here */}
            <li>
              <h3>{question.title}</h3>
              
              <div className="icon-container">
              <FontAwesomeIcon icon={faUser} className="fauser" />
</div>
                <button className="greaterthan" onClick={() =>navigate('/answers',{state:{
                  questionId:question.id,
                  title:question.title,
                  description:question.description,
                }})}><FontAwesomeIcon icon={faGreaterThan} /></button>
              
              <p className="username">{question.username}</p>
              <hr className="line" />
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
