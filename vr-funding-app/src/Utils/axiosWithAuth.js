import axios from 'axios'


export const axiosWithAuth = () =>{
    const token = window.localStorage.getItem('token')
    
    return axios.create({
        headers:{
            Authorization: `Bearer ${token}`
        },
        //fill out baseURL for auth
        baseURL: 'https://pedrocasuso-vr-funding-project.herokuapp.com'
    })
}