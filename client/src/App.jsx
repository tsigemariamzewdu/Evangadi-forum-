import { Route,Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login"
import Register from "./Pages/Register";
import { useEffect ,useState,createContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axiosConfig";

export const AppState=createContext()

function App() {
  

  const [user,setUser]=useState()
  const token=localStorage.getItem("token")
  const navigate=useNavigate()

   async function checkuser(){
    try{
      const {data} =await axios.get('user/check',{
        headers:{
          Authorization:"Bearer" + token,
        }
      })
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
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      </Routes>
  
   
      </AppState.Provider>
  );
}

export default App;
