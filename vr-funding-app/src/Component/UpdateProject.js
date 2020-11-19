import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {axiosWithAuth} from '../Utils/axiosWithAuth'


//SETTING INITIAL VALUES

const initialProjectValues = {
    projectname:'',
    author:'',
    description:'',
    projectimage: '',
    fundedamt: 0,
}


const UpdateProject = ({name, image, amount, desc, auth}) => {
   

    //SETTING INITIAL FORM STATE
    const [projectValues, setProjectValues] = useState(initialProjectValues)

    
    
    const {id} = useParams()


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
        event.preventDefault()
        axiosWithAuth()
            .put('projects/post/23', projectValues)
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
