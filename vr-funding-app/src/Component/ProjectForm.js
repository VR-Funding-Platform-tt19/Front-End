//  Still Needs:
//      - POST API Hook Info Line 41
//      - Route info Line 49
//      - Add connect method 


import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../Utils/axiosWithAuth'

import { projectFormSchema } from './FormSchemas/projectFormSchema'
import * as yup from 'yup'

// Notes:
// This is the form where a fundraiser can create their fundraising project.
// This information needs to be passed to Project

const initialState = {
    projectName:'',
    author:'',
    description:'',
    fundingGoal:'',
    // image:''// look up how to upload a picture to the backend as a url
}

const initialProjectErrors = {
    projectName:'',
    author:'',
    description:'',
    fundingGoal:'',
};

const ProjectForm = () => {

    const [ newProject, setNewProject ] = useState(initialState) // state will hold new project info
    const [ newProjectErrors, setNewProjectErrors ] = useState(initialProjectErrors)

    const history = useHistory()

    // ------ Event Handlers ----

    const handleChange = (e) => {
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

    const onSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth()
            .post('/projects/project', newProject)
                .then((res) => {
                    console.log(res)
                    // What does the post return 
                    // props.setProjectData(res.data)
                })
                .catch((error)=> {
                    console.log(error)
                })
        // onsubmit the user needs to be routed back to the dashboard?
        history.push('') // need to add routing information 
    }

    return (
        <div>
            <h1> We are in ProjectForm</h1>
            <form onSubmit={onSubmit}>
                <label>Project Name:</label>
                <input
                    name='projectName'
                    type='text'
                    value={newProject.projectName}
                    onChange={handleChange}
                />

                <label> Author:</label>
                <input
                    name='author'
                    type='text'
                    value={newProject.author}
                    onChange={handleChange}
                />

                <label>Description:</label>
                <input
                    name='description'
                    type='text'
                    value={newProject.description}
                    onChange={handleChange}
                />

                <label>Funding Goal:</label>
                <input
                    name='fundingGoal'
                    type='text'
                    value={newProject.fundingGoal}
                    onChange={handleChange}
                />
            </form>
        </div>
    )
}

export default ProjectForm
