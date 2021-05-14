import React,{useState} from 'react'
import { useHistory } from "react-router-dom";

export default function Alert({close,text,error,login}) {
    console.log(error)
    const color=error?'#f44336':'green'
    const history=useHistory()
    const moveToLogin=()=>{
        close()
        history.push('/')
    }
    return (
        <div className='alert-container'>
        <div className="alert" style={{backgroundColor:color}}>
            <span className="closebtn" onClick={close}>&times;</span> 
            <strong>
            {
                error ? <>Error !! </> :<> Success !!</>
            }
            </strong> &nbsp; {text}&nbsp;&nbsp;&nbsp;
            {login?<button className='login-btn alert-login' onClick={moveToLogin} style={{ boxShadow:'none',width:'120px',margin:'2px'}}> Login</button>:null}
        </div>
        
        </div>
    )
}
Alert.defaultProps={
    error:false,
    login:false
}
