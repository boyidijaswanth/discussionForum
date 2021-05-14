import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom'
import axios from "axios";
import Alert  from "../components/Alert";
const transport = axios.create({
  withCredentials: true
})

const loginURL = process.env.REACT_APP_LOGIN_URL;
const signupURL = process.env.REACT_APP_REGISTARTION_URL;

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             signIn:false,
             userName:'',
             password:'',
             showAlert:false,
             alertData:'',
             error:false
        }
        this.toggleButton=this.toggleButton.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
        this.formSubmit=this.formSubmit.bind(this)
        this.signUp=this.signUp.bind(this)
        this.closeAlert=this.closeAlert.bind(this)
    }
    
    closeAlert(){
        this.setState({showAlert:false,userName:'',password:''})
    }


    async formSubmit(e){
        e.preventDefault()
       if(this.state.userName.length>2 && this.state.password.length>2){
           await transport.post(loginURL,{
                "username":this.state.userName,
                "password":this.state.password
            }).then((result) => {
                console.log(result)
                localStorage.setItem('log',312)
                localStorage.setItem('user',this.state.userName)
                localStorage.setItem('usd',this.state.userName)
                
                this.setState({
                    showAlert:true,
                    alertData:result.data.message,userName:'',password:''
                })
                console.log(this.props.history)
                this.props.history.push('/discussion-list')
            }).catch((err) => {
                console.log(err.message)
                 this.setState({
                    showAlert:true,alertData:err.message,
                    error:true,userName:'',password:''
                })
                
            });
        }else{
        this.setState({
                showAlert:true,alertData:'Please enter user name and password',
                error:true,
        },()=>setTimeout(()=>this.closeAlert(),1000))    
        }
    }

    async signUp(e){
       e.preventDefault()
       if(this.state.userName.length>2 && this.state.password.length>2){
            const res=await transport.post(signupURL,{
                "username":this.state.userName,
                "password":this.state.password}).then((result) => {
                localStorage.setItem('log',312)
                localStorage.setItem('user',this.state.userName)
                this.setState({
                    showAlert:true,alertData:result.data.message,userName:'',password:''
                })
                this.props.history.push('/discussion-list')
            }).catch((err) => {
                console.log(err)
                 this.setState({
                    showAlert:true,alertData:err.message,error:true,userName:'',password:''
                })
            });
        }else{
        this.setState({
                showAlert:true,alertData:'Please enter user name and password',
                error:true,
        },()=>setTimeout(()=>this.closeAlert(),1000))    
        }
    }

    changeHandler=e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }    

    toggleButton(e){
        e.preventDefault()
        this.setState(prevState=>{
         return {signIn:!prevState.signIn,userName:'',password:''}
        })
    }

    render() {
        const btn=this.state.signIn ? <button className='login-btn' type='submit' onClick={this.signUp}> Sign In &nbsp;<i className="fas fa-sign-in-alt"></i></button>:<button className='login-btn' type='submit' onClick={this.formSubmit}>Login &nbsp;<i className="fas fa-sign-in-alt"></i></button>
        return (
            <>
            {this.state.showAlert ? <Alert text={this.state.alertData} close={this.closeAlert} error={this.state.error}/> : null}

            <form onSubmit={this.formSubmit}>
                <input type='text' className='form-elements' placeholder="User name" name='userName' value={this.state.userName} onChange={this.changeHandler} required></input>
                <input type='password' className='form-elements' placeholder='Password' name='password' value={this.state.password} onChange={this.changeHandler} required></input>
               { btn}
                <Link to='/discussion-list' className='discuss-btn'>
                    Discussion page &nbsp; <i className="fas fa-arrow-circle-right"></i>
                </Link>
                <br/>
                <br/>
            </form>

            {this.state.signIn ? <a onClick={this.toggleButton}><i className="fas fa-arrow-left"></i> &nbsp;Back to login</a>:<span>New user? <a onClick={this.toggleButton}>click here to signup</a></span>}
             </>
        )
    }
}

export default withRouter(Login)
