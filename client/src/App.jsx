import { Route,Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register";
import { useEffect ,useState,createContext} from "react";
import { useNavigate ,Link} from "react-router-dom";
import axios from "./axiosConfig";
import Header from "./Components/Header/Header";
import How from "./Pages/howItWorks/How"
import "./App.css";
import Ask from "./Pages/Ask/Ask";
import Answer from "./Pages/Answer/Answer";
import Sidenote from "./Components/Sidenote/Sidenote";



export const AppState=createContext()

function App() {
  

  const [user,setUser]=useState()
  const token=localStorage.getItem("token")
  const navigate=useNavigate()

   async function checkuser(){
    try{
      const {data} =await axios.get('user/check',{
        headers:{
          Authorization:"Bearer " + token,
        }
      })
      console.log(data.user)
      setUser(data)
    } catch(error){
      console.log(error.response)
      navigate("/login")

    }
  }


  useEffect(()=>{
    checkuser();


  },[])
  

  
  return (
   <AppState.Provider value={{user,setUser}}>
     <div className='login-page'>
    <Header/>
      <Routes>
        <Route path="/howitworks" element={<How/>}/>
      <Route path='/' element={
        <>
        <Home/> 
        </>}/>
        <Route path="/ask" element={<Ask/>}/>
      <Route path='/login' element={ <><Login/> <Sidenote/></>}/>
      <Route path='/register' element={<><Register/> <Sidenote/></>}/>
      <Route path ="/answers" element={<Answer/>}/>
      </Routes>
     
      







      </div>
   
      </AppState.Provider>
  );
}

export default App;
