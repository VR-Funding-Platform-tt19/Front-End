import React from 'react'
// Note:
// Project cards are rendered to the dashboard
// Onlcick <Project> is rendered


const ProjectCard = (props) => {

    const { project } = props
    
    
    return (
        <div>
            <div>
                <h2>Project Name: {project.projectName}</h2>
                <h3>Project Author: {project.author}</h3>
                <h4>Project Funding Goal: {project.fundingGoal}</h4>
                <h4>Project Description: {project.description}</h4>
            </div>
        </div>
    )
}

export default ProjectCard
