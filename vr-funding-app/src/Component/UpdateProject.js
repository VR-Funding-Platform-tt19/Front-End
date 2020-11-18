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
    
    
    const {id} = useParams()

    

    //USE EFFECT AXIOSWITHAUTH()CALL FOR ID
    useEffect(()=>{
            
            axiosWithAuth()
            .get(`/entrepreneurs/projects`)
            .then(res=>{
                console.log(res.data)
                const project = res.data.find((proj)=> proj.projectid == id) // do not change to ===
                setProjectValues(project)
            })
            .catch(error=>{
                console.log('THIS IS YOUR ERROR----->', error)
            })  
    },[])


    //HELPER FUNCTIONS
    const history = useHistory()

    console.log(projectValues)
    //EVENT HANDLERS
    const handleChange = (event) =>{
       
        setProjectValues({
            ...projectValues,
            [event.target.name]: event.target.value
        })
    }
    console.log(id)
    // put endpoint not working
    const handleSubmit = (event) =>{
        console.log(projectValues)
        event.preventDefault()
        axiosWithAuth()
            .put('projects/post/' + id, projectValues)
                .then(res=>{
                    console.log(res.data)
                    history.push('/dashboard')
                })
                .catch(error=>{
                    console.log('THIS IS YOUR ERROR-------->', error)
            })
        
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2 className='form-title'>Add A New Project</h2>
                <label>Project Name: {' '}</label>
                <input
                name='projectname'
                type='text'
                defaultValue={projectValues.projectname}
                onChange={handleChange}
                />

                <label>Project Author: {' '}</label>
                <input
                name='author'
                type='text'
                defaultValue={projectValues.author}
                onChange={handleChange}
                />

                <label>Project Description: {' '}</label>
                <input
                name='description'
                type='text'
                defaultValue={projectValues.description}
                onChange={handleChange}
                />

                <label>Funding Goal: {' '}</label>
                <input
                name='fundedamt'
                type='number'
                defaultValue={projectValues.fundedamt}
                onChange={handleChange}
                />
                <button>Finish Editing</button>
            </form>
        </div> 
    )
}
    


export default UpdateProject
