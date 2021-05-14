import axiosInstance from "../axiosInstance";

export function loginUser(data){
    console.log(data)
    return axiosInstance.post('/login',JSON.stringify(data));
}

export function registerUser(data){
    return axiosInstance.post('/registerNewUser', JSON.stringify(data));
}

