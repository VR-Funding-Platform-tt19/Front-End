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

const initialState = 
    {
        projectname: "pedrotest",
        description: "test1",
        author: "test",
        projectimage: "test",
        fundedamt: 5
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
        <div>
            <h1> We are in ProjectForm</h1>
            <form onSubmit={onSubmit}>
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

                <label>Description:</label>
                <input
                    name='description'
                    type='text'
                    value={newProject.description}
                    onChange={handleChange}
                />

                <label>Funding Goal:</label>
                <input
                    name='fundedamt'
                    type='number'
                    value={newProject.fundedamt}
                    onChange={handleChange}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default ProjectForm
