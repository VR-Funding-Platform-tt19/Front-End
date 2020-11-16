// Notes:
// When you login:
// You are going to enter the dasboard
// On the dashboard the <Project Card> component will be rendered

// Need To Do:
//  - mapToProps ---> setProjectData

import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../Utils/axiosWithAuth'
import axios from 'axios'

import { connect } from 'react-redux'

const ProjectDashboard = () => {

    // we need to add setProjectData to the global props store
    const [ projectData, setProjectData ]= useState([])


    useEffect(()=> {
        // axiosWithAuth()
        axios
            .get('Need API Hook')
                .then((res)=> {
                    console.log(res)
                    // setProjectData(res.data)
                })
                .catch((error)=>{
                    console.log(error)
                })
        
    })

    return (
        <div>
            <h1>We are in ProjectDashboard</h1>
            <h1>Welcome Back {userName} </h1>
            <div>
                {projectData.map((project)=>{

                    <ProjectCard key={project.id} project={project}/>

                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    

}

export default ProjectDashboard
