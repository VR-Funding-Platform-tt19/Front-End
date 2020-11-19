// Notes:
// When you login:
// You are going to enter the dasboard
// On the dashboard the <Project Card> component will be rendered

// Need To Do:
//  - mapToProps ---> setProjectData

import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../Utils/axiosWithAuth'
import axios from 'axios'
import styled from 'styled-components';

import { useHistory } from 'react-router-dom'

import { connect } from 'react-redux'



// ---------  Components ---------
import ProjectCard from '../Component/ProjectCard'


// ------ Form Styling ------
const DashboardPage = styled.div`
    padding: 3em 5em 5em 5em;
    max-width: 100%;
    max-height: 100%;
    height: 80vh;
    /* min-height: 100%; */
    h1 {
    text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
    }
    .newProject {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto;
        padding: 2em 4em 2em 4em;
        width: 75%;
        background-color: #5052b5;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

        h2 {
            margin: auto;
            text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
        }
        p {
            margin: 2em auto 2em auto;
            text-align: center;
        }
        button {
            width: auto;
            margin: 0 auto 0 auto;
        }
    }
`;

const ProjectWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 3em;
`;

const ProjectDashboard = (props) => {
    
    

    // we need to add setProjectData to the global props store
    const [ projectData, setProjectData ]= useState([])
    console.log(projectData)
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
        <DashboardPage>
            <h1 className="major">Projects</h1>
            {/* <h1>Welcome Back {userName} </h1> */}
            <div className='newProject'>
                <h2>Create a new project?</h2>
                <p>Bring your project to life. Get people as excited about your project as you are. Click below to get started.</p>
                <button onClick={() => history.push('/project-form')}>New Project</button>
            </div>
            
            <ProjectWrapper>
                {projectData.map((project)=> (

                    <ProjectCard key={project.id} project={project}/>

                ))}
            </ProjectWrapper>
        </DashboardPage>
    )
}



export default ProjectDashboard
