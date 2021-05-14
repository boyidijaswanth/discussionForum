import React from 'react'
import { useHistory } from "react-router-dom";


export default function Card({userName,topic,description,date,topicId}) {
    
    const history = useHistory();
    const openDiscussion=()=>{
        history.push({
            pathname:'/discussion',
            state:{topicId}
        })
    }
    
    return (
        <div className='discussion-container'>
            <div className='topic'>
                <h6>{userName}</h6>
                <div className='content'>
                <h2>{topic}</h2>
                </div>
                <div className='date'><h6>{new Date(date).toLocaleDateString('en-gb')} &nbsp; {new Date(date).toLocaleTimeString('en-gb')}</h6></div>
            </div>
            <div className='description'>
                <h6>Description</h6>
                <div className='content1'>
                <h2>{description.substring(0,20)+'...'}</h2>
                </div>
                <button className='readmore-btn' onClick={openDiscussion}>Read more..</button>
            </div>
        </div>
    )
}
