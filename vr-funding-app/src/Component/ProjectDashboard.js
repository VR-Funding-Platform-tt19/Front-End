// Notes:
// When you login:
// You are going to enter the dasboard
// On the dashboard the <Project Card> component will be rendered

import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../Utils/axiosWithAuth'
import axios from 'axios'

const ProjectDashboard = () => {

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
            <h1>Welcome Back {userName} </h1>
            <div>
                {projectData.map((project)=>{

                    <ProjectCard key={project.id} project={project}/>

                })}
            </div>
        </div>
    )
}

export default ProjectDashboard
