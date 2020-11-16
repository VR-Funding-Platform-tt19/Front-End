//  Still Needs:
//      - POST API Hook Info Line 41
//      - Route info Line 49
//      - Add connect method 


import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../Utils/axiosWithAuth'

// Notes:
// This is the form where a fundraiser can create their fundraising project.
// This information needs to be passed to Project

const initialState = {
    id:'',
    projectName:'',
    author:'',
    description:'',
    fundingGoal:'',
    // image:''// look up how to upload a picture to the backend as a url
}

const ProjectForm = () => {

    const [newProject, setNewProject ] = useState(initialState) // state will hold new project info

    const history = useHistory()

    // ------ Event Handlers ----

    const handleChange = (e) => {
        setNewProject({
            ...newProject,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // axiosWithAuth()
        axios
            .post('{/* need api hook */', newProject)
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
