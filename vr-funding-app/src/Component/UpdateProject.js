import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {axiosWithAuth} from '../Utils/axiosWithAuth'


//SETTING INITIAL VALUES

const initialProjectValues = {
    projectname:'',
    author:'',
    description:'',
    fundedamt:0,
}


const UpdateProject = (props) => {
    // const { name, image, author, description, amount} = props
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
                
                console.log('This is original GET------------>', project)
                console.log('This is original AMOUNT------------>', project.fundedamt)
                setProjectValues({
                "projectname": project.projectname,
                "author": project.author,
                "description": project.description,
                "projectimage": project.projectimage,
                "fundedamt": project.fundedamt})
            })
            .catch(error=>{
                console.log('THIS IS YOUR ERROR----->', error)
            })  
    },[])
    console.log(projectValues)

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
    
    const handleSubmit = (event) =>{
        console.log(projectValues)
        console.log('FUNDED AMOUNT------->',projectValues.fundedamt)
        event.preventDefault()
        axiosWithAuth()
            .put('projects/post/40', projectValues)
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
                <h2 className='form-title'>Edit Project</h2>
                <label>Project Name: {' '}</label>
                <input
                name='projectname'
                type='text'
                value={projectValues.projectname}
                onChange={handleChange}
                />

                <label>Project Author: {' '}</label>
                <input
                name='author'
                type='text'
                value={projectValues.author}
                onChange={handleChange}
                />

                <label>Project Description: {' '}</label>
                <input
                name='description'
                type='text'
                value={projectValues.description}
                onChange={handleChange}
                />

                <label>Funding Goal: {' '}</label>
                <input
                name='fundedamt'
                type='number'
                value={projectValues.fundedamt}
                onChange={handleChange}
                />
                <button>Finish Editing</button>
            </form>
        </div> 
    )
}
    


export default UpdateProject
