import axios from "axios";
import React,{useState,useEffect} from "react";
import Discuss from '../assets/main_discussion.jpg'
import Alert from "./Alert";
import Login from "./Login";
const transport = axios.create({
  withCredentials: true
})
const logoutAPI=process.env.REACT_APP_LOGOUT_URL

function SignupPage(){
   
    const [showAlert, setShowAlert] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [spinnerLoad, setSpinnerLoad] = useState(true)
    const closeAlert=()=>{
        setShowAlert(false)
    }

    const expireCookie=()=>{
        transport.post(logoutAPI).then(res=>console.log('logout response->',res)).catch(err=>console.log(err))
    }

    useEffect(() => {
        if(localStorage.getItem('user')){
            localStorage.removeItem('user')
            localStorage.removeItem('log')
            expireCookie()
        }        
    }, [])
    
  return (
      <>
    <div className="container">
        {showAlert?<Alert close={closeAlert} text={errorText}/>:''}
        <div className='image-container'>
            <img src={Discuss} alt="Logo " width="800" height="500" />
        </div>
        <div className='form-container'>
            <div className='card'>
                <div className='heading'>
                    <span className='bname'>Social</span>
                    <span className='bname'>network</span>
                </div>
                <br/>
                <span className='subheading'>Alone we can do so little, together we can do so much.</span>
                <br/>
                <span className='subheading'> - Helen Keller</span>
              
                
                 <Login/>
                
            </div>
        </div>
    </div>
    </>
  );
}
export default SignupPage;