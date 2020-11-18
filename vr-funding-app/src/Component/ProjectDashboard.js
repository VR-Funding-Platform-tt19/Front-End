// Notes:
// When you login:
// You are going to enter the dasboard
// On the dashboard the <Project Card> component will be rendered

// Need To Do:
//  - mapToProps ---> setProjectData

import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../Utils/axiosWithAuth'
import axios from 'axios'

import { useHistory } from 'react-router-dom'

import { connect } from 'react-redux'



// ---------  Components ---------
import ProjectCard from '../Component/ProjectCard'




const ProjectDashboard = (props) => {
    
    

    // we need to add setProjectData to the global props store
    const [ projectData, setProjectData ]= useState([])

    const history = useHistory()

    // This will pull down all the projects
    useEffect(()=> {
        axiosWithAuth()
            .get('/entrepreneurs/projects')
                .then((res)=> {
                    console.log(res.data)
                    setProjectData(res.data)
                })
                .catch((error)=>{
                    console.log(error)
                })
        
    },[])

    return (
        <div>
            <h1>We are in ProjectDashboard</h1>
            {/* <h1>Welcome Back {userName} </h1> */}
            <button onClick={() => history.push('/project-form')}>Create a New Project</button>
            <div>
                {projectData.map((project)=> (

                    <ProjectCard key={project.id} project={project}/>

                ))}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        projects: state.projectData,
        error: state.error,
    }
}

export default connect(mapStateToProps)(ProjectDashboard)
