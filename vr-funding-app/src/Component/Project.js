// Notes:
// This component when rendered will give the information of just one project
// You will have an 'Edit' and 'Delete' buttons with functionality

import React, { useState, useEffect} from 'react'
import styled from 'styled-components'



import { axiosWithAuth } from '../Utils/axiosWithAuth'
import { useHistory, useParams } from 'react-router-dom'
import UpdateProject from './UpdateProject'


const Project = (props) => {

    const [projectData, setProjectData] = useState('')


    
    const { id } = useParams()
    const history = useHistory()

    // console.log(projectData)
    // const projects = projectData    
    // console.log(projects)
    // console.log(id)
    // const idA = id
    // console.log(idA)
    
    // const projectA = projects.find((proj)=> proj.projectid == id )
    // console.log(projectA)

    console.log(projectData)
    useEffect(() => {
        axiosWithAuth()
            .get('/entrepreneurs/projects')
                .then((res)=> {
                    console.log(res.data)
                    const project = res.data.find((proj)=> proj.projectid == id) // do not change to ===
                    setProjectData(project)
                })
                .catch((error)=> {
                    console.log(error)
                })
    },[])
    console.log(id)
    const handleDeleteProject = (e) => {
        console.log(projectData)
        e.preventDefault()
        axiosWithAuth()
            .delete('/projects/post/' + id)
                .then((res)=>{
                    //set state
                    // setMainProjectData(res.data)
                    history.push('/dashboard')
                })
                .catch((error)=> {
                    console.log(error)
                })
    }
console.log(projectData.projectname, projectData.author, projectData.projectimage, projectData.description, projectData.fundedamt )
    return (
        <div>
            <h1> We are in Project.js</h1>
            <h2>Project Name: {projectData.projectname}</h2>
            <h3>Project Author: {projectData.author}</h3>
            <h4>Project Funding Goal: {projectData.fundedamt}</h4>
            <h4>Project Description: {projectData.description}</h4>
            <button onClick={()=> history.push(`/update-project/${projectData.projectid}`)}>Edit</button> 
            {/* <button onClick={setVisible(!visible)}>Edit</button> */}
            <button onClick={handleDeleteProject}>Delete</button>
            {/* Notes: 
                Option 1: Pass below props to </UpdateProject> without rendering component
                Option 2: How to conditionaly render that component  */}
            
                <UpdateProject name={projectData.projectname} auth={projectData.author} 
                image={projectData.projectimage} desc={projectData.description} amount={projectData.fundedamt}/>
           
        </div>
    )
}

export default Project
