import React from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import {createContext} from 'react'
import Project from './Project'

// Note:
// Project cards are rendered to the dashboard
// Onlcick <Project> is rendered

const ProjectContext = createContext()

const ProjectCard = () => {
    const [projectData, setProjectData] = useState([])
    
    return (
        <ProjectContext.Provider value={projectData}>

        <div>
            <h1>We are in Project Card</h1>
            <div>
                <h2>Project Name: {project.projectName}</h2>
                <h3>Project Author: {project.author}</h3>
                <h4>Project Funding Goal: {project.fundingGoal}</h4>
                <h4>Project Description: {project.description}</h4>
            </div>
        </div>
        {projectData && <Project/>}
        </ProjectContext.Provider>
    )
}

export default ProjectCard
