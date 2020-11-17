import axios from 'axios'


export const axiosWithAuth = () =>{
    const token = localStorage.getItem('token')
    return axios.create({
        header:{
            authorization:token
        },
        //fill out baseURL for auth
        baseURL: 'http://pedrocasuso-vr-funding-project.herokuapp.com'
    })
}