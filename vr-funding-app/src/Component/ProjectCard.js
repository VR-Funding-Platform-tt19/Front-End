import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';



const ProjectCardItem = styled.div`
    width: 25em;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 2em;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.25);

    h2 {
      text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
    }

    p {
      margin: auto;
    }

    img {
      max-width: 100%;
      max-height: 100%;
    }
    &:hover {
        box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2);
    }

`;

// Note:
// Project cards are rendered to the dashboard
// Onlcick <Project> is rendered


const ProjectCard = (props) => {

    const { project } = props
    const history = useHistory()
    
    console.log(project.projectid)

    
    return (
        <ProjectCardItem>
           
            <div onClick={()=> history.push(`/project/${project.projectid}`)}>
                <h2>{project.projectname}</h2>
                <p>Author: {project.author}</p>
                <p>Funding Goal: {project.fundedamt}</p>
                <p>Description: {project.description}</p>
            </div>   
        </ProjectCardItem>
    )
}

export default ProjectCard
