import React,{useState,useEffect} from 'react'

export default function CommentsCard({userId,data,deleteComment,editComment}) {
    
     const [comment, setcomment] = useState('')
     const [edit, setedit] = useState(false)

    const deleteData=()=>{
        deleteComment(data._id)
    }

    const editData=()=>{
        setedit(true)
        setcomment(data.reply)
    }

    const toogleEdit=()=>{
        setedit(!edit)
    }

    const saveData=()=>{
        editComment(comment,data._id)
        toogleEdit()
    }

    return (
        <div className='comment-card-main'>
            <div className='user-info'>
                <div className='comment-header'>
                    <h6><i className="fas fa-user" style={{fontSize:'small'}}></i> &nbsp;{data.replied_by}</h6>
                    <div className='date-nd-link'>
                        <h5>&nbsp;&nbsp;&nbsp; {new Date(data.created_at).toDateString()}</h5>
                    </div>
                </div>
                <div className='comment-desc'>{edit?<textarea value={comment} onChange={e=>setcomment(e.target.value)} cols={80}></textarea>:<h6>{data.reply}</h6>}</div>
                <div className='comment-footer'>
                
                    {edit?
                    <>
                    <button onClick={saveData}>save</button>
                    <button onClick={toogleEdit}>cancel</button>
                    </>
                    :
                    localStorage.getItem('user') && userId && userId===data.user_id?
                    <>
                    <button onClick={deleteData}>delete</button>
                    <button onClick={editData}>edit</button>
                    </>
                    :null}
                </div>
            </div>
        </div>
    )
}
