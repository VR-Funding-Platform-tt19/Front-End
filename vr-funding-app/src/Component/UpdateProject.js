import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {axiosWithAuth} from '../Utils/axiosWithAuth'

///PROJECT QUESTIONS/////

/// 1.Do we still need to save the username and id for functional purposes?
/// 2.Axios with auth for the useEffect calls or just straight axios?





//SETTING INITIAL VALUES

const initialProjectValues = {
    projectname:'',
    author:'',
    description:'',
    fundedamt:'',
}


const UpdateProject = (props) => {
    const { name, image, author, description, amount} = props
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
                console.log('This is original GET------------>', project)
            })
            .catch(error=>{
                console.log('THIS IS YOUR ERROR----->', error)
            })  
    },[])

    const testData = {

        "projectname": name,
        "author": author,
        "description": description,
        "projectimage": image,
        "fundedamt": amount,
    }
console.log(testData)
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
            .put('projects/post/21', testData)
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
