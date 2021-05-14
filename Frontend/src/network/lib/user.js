import { axiosInstance } from "../axiosInstance";

export function getUser(){
    return axiosInstance.get('/user');
}

export function getTopics(){
    return axiosInstance.get('/topics');
}
export function getReplies(){
    return axiosInstance.get('/replies');
}

export function postTopic(data){
    return axiosInstance.post('/topic', JSON.stringify(data));
}
export function postReplyc(data){
    return axiosInstance.post('/reply', JSON.stringify(data));
}

