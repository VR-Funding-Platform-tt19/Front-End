import React from 'react'
import { useHistory } from 'react-router-dom'



// Note:
// Project cards are rendered to the dashboard
// Onlcick <Project> is rendered


const ProjectCard = (props) => {

    const { project } = props
    const history = useHistory()
    
    console.log(project.projectid)

    
    return (
        <div>
           
            <div onClick={()=> history.push(`/project/${project.projectid}`)}>
                <h2>Project Name: {project.projectname}</h2>
                <h3>Project Author: {project.author}</h3>
                <h4>Project Funding Goal: {project.fundedamt}</h4>
                <h4>Project Description: {project.description}</h4>
            </div>   
        </div>
    )
}

export default ProjectCard
