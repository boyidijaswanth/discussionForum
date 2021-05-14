import React from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
const transport = axios.create({
  withCredentials: true
})
const logoutAPI=process.env.REACT_APP_LOGOUT_URL
export default function Logout() {
    const history=useHistory()
    const logoutUser=()=>{
        transport.post(logoutAPI).then(res=>{
            console.log('logout response->',res)
            localStorage.removeItem('user')
            localStorage.removeItem('log')
            history.push('/')
        }).catch(err=>{
            console.log(err)
            history.push('/')
        })
    }
    return (
        <div >
            <button className='logout-btn'  onClick={logoutUser}>
            <i className="fas fa-power-off" style={{fontSize:'18px',color:'#7b96a1'}} ></i>
            </button>
        </div>
    )
}
