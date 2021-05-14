import axios from 'axios'
import React,{useEffect,useState} from 'react'
import Alert from './Alert';
const transport = axios.create({
  withCredentials: true
})

const postTopicURL = process.env.REACT_APP_POST_TOPIC_URL;
const updateTopicURL = process.env.REACT_APP_UPDATE_TOPIC_URL;

export default function Form({close,onSuccess,data,update}) {
    const [topicName, settopicName] = useState(data !==null ? data.topic : '')
    const [description, setdescription] = useState(data !==null ? data.description : null)
     const [showAlert, setShowAlert] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [error, setError] = useState(true)

     const closeAlert=()=>{
        setShowAlert(false)
    }
    const signUp=(e)=>{
        e.preventDefault()
        if(update!==null){  
            transport.patch(`${updateTopicURL}/${data._id}`,{"topic":topicName,
        "description":description}).then(res=>{
            setShowAlert(true)
            setErrorText(res.data.message)
            setError(false)
            onSuccess()
            setTimeout(()=>{closeAlert()
                close()},2000)
        }).catch(err=>{
            setShowAlert(true)
            setErrorText(err.message)
            setTimeout(()=>{closeAlert()},2000)
    })

        }else{
        transport.post(postTopicURL,{"topic":topicName,
        "description":description}).then(res=>{
            setShowAlert(true)
            setErrorText(res.data.message)
            setError(false)
            onSuccess()
            setTimeout(()=>{closeAlert()
                close()},2000)
        }).catch(err=>{
            setShowAlert(true)
            setErrorText(err.message)
            setTimeout(()=>{closeAlert()},2000)
    })
    }

    }
    return (
        <form>
        {showAlert?<Alert close={closeAlert} text={errorText} error={error}/>:null}
        <div className='main-form-container'>
            <div className='formContainer'>
                <div className='form-header'>
                    <h2>Topic</h2>
                    <input type='text' className='form-topic' name='topic' placeholder='Enter name' value={topicName} onChange={e=>settopicName(e.target.value)} required></input>
                </div>
                <div className='form-content'>
                    <h4>Description</h4>
                    <textarea cols='10' rows='4' placeholder='Enter description' className='form-topic' name='description' value={description} onChange={e=>setdescription(e.target.value)} required></textarea>
                </div>
                <div className='form-footer'>
                    <button className='login-btn save-btn' type='submit' onClick={signUp}>{update!==null?'Update':'Create'}</button>
                    <button className='login-btn cancel-btn' type='submit' onClick={close}>Close </button>
                </div>
            </div>
        </div>
        </form>
    )
}

Form.defaultProps={
    data:null,
    update:null
}
