import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {axiosWithAuth} from '../Utils/axiosWithAuth'

///PROJECT QUESTIONS/////

/// 1.Do we still need to save the username and id for functional purposes?
/// 2.Axios with auth for the useEffect calls or just straight axios?





//SETTING INITIAL VALUES

const initialProjectValues = {
    id:'',
    projectName:'',
    author:'',
    description:'',
    fundingGoal:'',
}


const UpdateProject = () => {
    //SETTING INITIAL FORM STATE
    const [projectValues, setProjectValues] = useState(initialProjectValues)
    const [userId, setUserId]= useState(0)
    const {id} = useParams()

    //USE EFFECT AXIOSWITHAUTH()CALL FOR ID
    useEffect(()=>{
        if(id){
            axiosWithAuth()
            .get(`projectURL/getproject/${id}`)
            .then(response=>{
                setProjectValues(response.data)
            })
            .catch(error=>{
                console.log('THIS IS YOUR ERROR----->', error)
            })
        }
    },[id])

    const updateForm = (name, value) =>{
        setProjectValues({
            ...projectValues,
            [name]: value
        })
    }

    //HELPER FUNCTIONS
    const history = useHistory()

    //EVENT HANDLERS
    const handleChange = (event) =>{
        const {name, value} = event.target
        updateForm(name, value)
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        if(id){
            axiosWithAuth()
            .put(`projectURL/getproject/${id}`, projectValues)
            .then(response=>{
                history.push(`/projectDashboard/project/${id}`)
            })
            .catch(error=>{
                console.log('THIS IS YOUR ERROR-------->', error)
            })
        }
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <h2 className='form-title'>Add A New Project</h2>
                <label>Project Name {' '}</label>
                <input
                name='projectName'
                type='text'
                placeholder='Please enter a project name'
                defaultValue={projectValues.projectName}
                onChange={handleChange}
                />

                <label>Project Author {' '}</label>
                <input
                name='author'
                type='text'
                placeholder='Project Author'
                defaultValue={projectValues.author}
                onChange={handleChange}
                />

                <label>Project Description: {' '}</label>
                <input
                name='description'
                type='text'
                placeholder='Please describe your project'
                defaultValue={projectValues.description}
                onChange={handleChange}
                />

                <label>Funding Goal: {' '}</label>
                <input
                name='fundingGoal'
                placeholder='Funding Goal'
                defaultValue={projectValues.fundingGoal}
                onChange={handleChange}
                />
                <button onClick={handleSubmit}>Finish Editing</button>
            </form>
        </> 
    )
}
    


export default UpdateProject
