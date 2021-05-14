import axios from "axios";

export default ()=>{
    const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
    let headers={}
    if (localStorage.token) {
        headers.Authorization = `Bearer ${localStorage.token}`;
    }
    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers,
    });

    axiosInstance.interceptors.request.use(
        request=>{
            request.headers['Authorization']=localStorage.token?`Bearer ${localStorage.token}`:null
            return request
        },
        error=>{
            return Promise.reject(error)
        }
    )

    axiosInstance.interceptors.response.use(
        response=>{
            return response
        },
        error=>{
            let res=error.response;
            if(res.status===401){
                localStorage.removeItem('token')
                 window.location = "/login";
                
            }
            return Promise.reject(error);
        }
    )

    return axiosInstance

}