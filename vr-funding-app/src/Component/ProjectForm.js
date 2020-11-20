//  Still Needs:
//      - POST API Hook Info Line 41
//      - Route info Line 49
//      - Add connect method 


import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../Utils/axiosWithAuth'
import styled from "styled-components";


import { projectFormSchema } from './FormSchemas/projectFormSchema'
import * as yup from 'yup'

// Notes:
// This is the form where a fundraiser can create their fundraising project.
// This information needs to be passed to Project


const ProjectPage = styled.div`
  padding: 3em 5em 5em 5em;
  max-width: 100%;
  height: 79vh;
  overflow: hidden;
  h1 {
    text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
  }
`;

const ProjectFormCard= styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    padding: 2em 4em 2em 4em;
    width: 80%;
    background-color: #5052b5;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    button {
        margin: 2em auto auto auto;
    }
    textarea {
        font-family: Arial, Helvetica, sans-serif;
        height: 10em;

    }
`;


const initialState = 
    {
        projectname: "",
        description: "",
        author: "",
        projectimage: "",
        fundedamt: 0
    }


const initialProjectErrors = {
    "projectname": "",
    "description": "",
    "author": "",
    "projectimage": "",
    "fundedamt": 100
};

const ProjectForm = () => {

    const [ newProject, setNewProject ] = useState(initialState) // state will hold new project info
    const [ newProjectErrors, setNewProjectErrors ] = useState(initialProjectErrors)

    const history = useHistory()

    // ------ Event Handlers ----

    const handleChange = (e) => {
        console.log()
        yup
            .reach(projectFormSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setNewProjectErrors({
                    ...newProjectErrors, 
                    [e.target.name]: ''
                })
            })
            .catch((error) => {
                setNewProjectErrors({
                    ...newProjectErrors,
                    [e.target.name]: error.errors[0]
                })
            })

        setNewProject({
            ...newProject,
            [e.target.name]:e.target.value
        })
    }
    const addNewProject = newProject
    
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(newProject)
        axiosWithAuth()
            .post('/projects/project',addNewProject)
                .then((res) => {
                    console.log(res)
                    // What does the post return 
                    setNewProject(res.data)
                    history.push('/dashboard') // need to add routing information 
                })
                .catch((error)=> {
                    console.log(error.response)
                })
        // onsubmit the user needs to be routed back to the dashboard?
    }

    return (
        <ProjectPage>
            <h1 className="major">Create A Project</h1>
            <ProjectFormCard onSubmit={onSubmit}>
                <label>Project Name:</label>
                <input
                    name='projectname'
                    type='text'
                    value={newProject.projectname}
                    onChange={handleChange}
                />

                <label> Author:</label>
                <input
                    name='author'
                    type='text'
                    value={newProject.author}
                    onChange={handleChange}
                />

                <label>Funding Goal:</label>
                <input
                    name='fundedamt'
                    type='number'
                    value={newProject.fundedamt}
                    onChange={handleChange}
                />

                <label>Description:</label>
                <textarea
                    name='description'
                    type='text'
                    value={newProject.description}
                    onChange={handleChange}
                />

                <button>Submit</button>
            </ProjectFormCard>
        </ProjectPage>
    )
}

export default ProjectForm
