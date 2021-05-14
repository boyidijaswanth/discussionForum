import React,{useState,useRef,useEffect} from 'react'
import Card from './Card'
import Image from "../assets/pic.png";
import Form from './Form';
import Alert from './Alert';
import axios from 'axios';
import { useHistory } from "react-router-dom";
const transport = axios.create({
  withCredentials: true
})

const getTopicsURL = process.env.REACT_APP_GET_TOPICS_URL;
export default function DiscussionList() {
    const [data, setData] = useState([])
    const [showForum, setShowForum] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [clearBtn, setClearBtn] = useState(false)
    const [errorText, setErrorText] = useState('')
    const history=useHistory()
    const btnRef = useRef('')
    const moveToTopBtn=useRef(null)

    // window.onscroll=()=>scrollFun()

    const scrollFun=()=>{
        
        if (document.body.scrollTop >500 || document.documentElement.scrollTop > 500) {
             moveToTopBtn.current.style.display = "block";
        } else {
            moveToTopBtn.current.style.display = "none";
        }
    }

    const  shuffle=(array)=>{
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    const moveToTop=(e)=>{
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    const openDiscussionForum=e=>{
        if(localStorage.getItem('user') && localStorage.getItem('log')){
             setShowForum(!showForum)
        }else{
            setShowAlert(true)
            setErrorText(" Please login to create forum..")
        }  
    }

    const closeDiscussionForum=e=>{
        setShowForum(false)
    }

    const closeAlert=()=>{
        setShowAlert(false)
    }

    const onSuccess=()=>{
        getPosts()
    }
    const getPosts=async ()=>{
        await transport.get(getTopicsURL).then(res=>{setData(res.data.message)}).catch(err=>{console.log(err)})
    }
    const clearSearch= ()=>{
        btnRef.current.value=""
        setClearBtn(false)
        getPosts()    
    }

    useEffect(() => {
         getPosts()
    }, [])

    const fetchPosts=async(e)=>{
        e.preventDefault()
        if(btnRef.current.value.length>0){
            await transport.get(`${getTopicsURL}?topic=${btnRef.current.value}`)
            .then(res=>{
                setClearBtn(true)
                setData(res.data.message)
            })
            .catch(err=>{console.log(err)})
        }
    }

    return (
        <div className='main-container'>
        {showAlert?<Alert close={closeAlert} text={errorText} error={true} login={true} />:''}
            <div className='first'>
                <div className="sticky-div">
                    <img src={Image} alt="Logo " width="500" height="450" />
                    <div>
                    <button className='discuss-forum-btn' onClick={openDiscussionForum}>Create discussion forum</button>
                        <div style={{display:'inline'}}>
                            <input type='text' className='form-elements search-btn' ref={btnRef} placeholder="Search Topic"></input>
                            {clearBtn?<button className='form-elements search-btn search-icon clear-icon' onClick={clearSearch}><i class="fas fa-redo" style={{fontSize:'0.95rem',color:'#f04d4e'}}></i></button>:null}
                            <button className='form-elements search-btn search-icon' onClick={fetchPosts}><i class="fas fa-search" style={{fontSize:'0.95rem',color:'#137f7f'}}></i></button>
                        </div>
                    </div>
                    <button onClick={moveToTop} className='moveToTopBtn' ref={moveToTopBtn}><i className="fas fa-arrow-up"></i></button>
                </div>
            </div>
            <div className='second'>            
            {
                data.length>0 ? data.map((d,index)=>{
                    const arr=shuffle([1,2,3])
                return (
                    <div className='list-container' key={index}>
                        <div style={{order:arr[0]}} className='one'> </div>
                        <div style={{order:arr[1]}} className='two'> <Card userName={d.created_by} topic={d.topic} description={d.description} date={d.created_at} topicId={d._id}/></div>
                        <div style={{order:arr[2]}} className='three'></div>     
                    </div>
                    )
                })
                : <div style={{marginLeft:'40%'}}>No Discussions found</div>
            }
            </div>
           { showForum?<Form close={closeDiscussionForum} onSuccess={onSuccess}/>:''}
        </div>
    )
}
