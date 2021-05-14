import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import CommentsCard from './CommentsCard'
import Image1 from '../assets/comment.png'
import axios from "axios";
import Alert from "../components/Alert";
import Form from "../components/Form";
import Logout from './Logout';
const transport = axios.create({
  withCredentials: true
})
const getTopicsURL = process.env.REACT_APP_GET_TOPICS_URL;
const getCommentsURL = process.env.REACT_APP_GET_REPLIES_URL;
const postComment = process.env.REACT_APP_POST_REPLY_URL;
const updateCommentURL = process.env.REACT_APP_UPDATE_REPLY_URL;
const deleteCommentURL = process.env.REACT_APP_DELETE_REPLY_URL;
const getUserURL = process.env.REACT_APP_GET_USER_URL;
const deleteDiscussionURL=process.env.REACT_APP_DELETE_TOPIC_URL

export default function Discussion() {
    const [data, setData] = useState({created_at: "",created_by: "",description: "",topic: "",_id: ""})
    const [comments, setcomments] = useState([])
    const [commentText, setCommentText] = useState('')
    const [addComment, setaddComment] = useState(false)
    const [ShowLogin, setShowLogin] = useState(true)
    const [showAlert, setShowAlert] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [error, setError] = useState(true)
    const [showForum, setShowForum] = useState(false)
    const [loggedInUserData, setloggedInUserData] = useState(false)
    const history = useHistory()
    
     const closeAlert=()=>{
        setShowAlert(false)
    }
    const toggleComment=()=>{
        if(localStorage.getItem('user') && localStorage.getItem('log')){
            setaddComment(!addComment)
        }else{
            setErrorText('Please login to add comment')
            setShowAlert(true)
            setTimeout(()=>closeAlert(),2000)
        }
    }
    const getPosts=async ()=>{
        await transport.get(getTopicsURL).then(res=>{
            const reqData=res.data.message.filter(el=>el._id===history.location.state.topicId)
            setData(reqData[0])
            getComments()
        }).catch(err=>{console.log(err)})
    }

    const getComments=async ()=>{
        await transport.get(getCommentsURL+`?topic=${history.location.state.topicId}`).then(res=>{
            setcomments(res.data.message)
        }).catch(err=>{console.log(err)})
    }
    
    const postComments=async ()=>{
        if(commentText.length>0){
            await transport.post(postComment,{
                "topic_id":data._id,
                "reply":commentText   
            }).then(res=>{
                setCommentText('')
                toggleComment()
                getComments()
            }).catch(err=>{console.log(err)})
        }
    }

    const getLoggedInUserId=async ()=>{
        if( localStorage.getItem('user') && localStorage.getItem('log')){
                await transport.get(getUserURL).then(res=>{
                        setloggedInUserData(res.data.user)
                    }).catch(err=>{console.log(err)})
            }
    }

    const editPost=()=>{
        setShowForum(true)
    }

    const closeForum=()=>{
        setShowForum(false)
    }

    const onSuccess=()=>{
        getPosts()
    }

    useEffect(() => {
        getLoggedInUserId()
        getPosts()
      
    }, [])

    const editComment=async(data,id)=>{
         await transport.patch(updateCommentURL+`/${id}`,{'reply':data}).then(res=>{
            getComments()
        }).catch(err=>{console.log(err)})
    }

    const deleteComment= async(id)=>{
        await transport.delete(deleteCommentURL+`/${id}`).then(res=>{
            getComments()
        }).catch(err=>{console.log(err)})
    }

    const deleteDiscussion=async()=>{
        await transport.delete(deleteDiscussionURL+`/${data._id}`).then(res=>{
                setError(false)
                setShowLogin(false)
                setErrorText('Discussion successfully deleted 👍')
                setShowAlert(true)
                setTimeout(()=>{
                    closeAlert()
                    history.goBack()
                },1500)
            }).catch(err=>{console.log(err)})
    }
    


    return (
        <>
         {localStorage.getItem('user') && localStorage.getItem('log')?<Logout />:null}  
        <div className='main-topic-container'>
         
         {showAlert?<Alert close={closeAlert} text={errorText} error={error} login={ShowLogin}/>:null}
            <div className='topic-one'>
                <div className="sticky-div" style={{paddingLeft:'12px',paddingTop:'6%'}}>
                   {/* <h1>POST</h1> */}
                    <img src={Image1} alt="Logo " width="590" height="580"/>
                    
                </div>
            </div>
            <div className='topic-two'>
                <div className='topic-container'>
                <div className='topic-header'>
                    <div className='discussion-panel'>
                    <h3 style={{marginLeft:'6px'}}>TOPIC</h3> 
                    {
                    localStorage.getItem('user') && loggedInUserData && loggedInUserData._id===data.user_id ? <button className='delete-discussion' onClick={deleteDiscussion}><i className="fas fa-trash-alt"></i></button>:null
                    }
                    </div>
                    <h2>{data.topic}</h2>
                    <h5><i className="fas fa-calendar-alt" style={{color:'green',fontSize:'13px'}}></i> {new Date(data.created_at).toLocaleTimeString('en-gb')}  &nbsp;&nbsp;&nbsp; <i className="fas fa-user" style={{fontSize:'13px'}}></i>&nbsp;{data.created_by} </h5>
                   
                </div>
                <div className='seperator'>
                </div>
                <div className="topic-description">
                   {data.description}
                </div>
                <div className='topic-footer'>
                    <button className='form-elements comment-btn' onClick={toggleComment} >Comment</button>
                    {
                        localStorage.getItem('user')&& loggedInUserData && loggedInUserData._id===data.user_id?<button className='form-elements comment-btn' onClick={editPost}>Edit post</button>:null
                    }
                </div>
                <div className='add-comment'>
                </div>
            </div>
                <div className='comments-section'>
                   { 
                    addComment?
                    <>
                    <textarea cols='100' rows='4' placeholder='Enter comment' className='comment-box' name='commentText' value={commentText} onChange={e=>setCommentText(e.target.value)} required></textarea>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                    <button className='cmnt-btn'  onClick={postComments}>Add </button>
                    <button className='cmnt-btn'  onClick={toggleComment}>Close </button>
                    </div>
                    </>
                    : null
                    }   


                    {/* <div className='seperator'>
                    </div> */}
                    <hr />
                    <div className="header">
                    <p style={{margin:'15px 5px',fontSize:"0.8rem"}}>Comments : {comments.length}</p>
                    </div>
                    
                    {comments.length<1?null:<div className='seperator'>
                    </div>
                    }
                    
                    {/* Comments  */}
                    {
                        comments.map((dt,index)=> <CommentsCard key={index} userId={loggedInUserData._id} data={dt} deleteComment={deleteComment} editComment={editComment}/>)

                    }
                    {
                        comments.length<1 ?<span style={{textAlign:'center',padding:'16px'}}> No comments</span>:null
                    }
                   

                </div>
            </div>
             { showForum?<Form close={closeForum} onSuccess={onSuccess} data={data} update='true'/>:''}
       </div>
       </>
 
    )
}
