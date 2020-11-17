// Notes:
// This component when rendered will give the information of just one project
// You will have an 'Edit' and 'Delete' buttons with functionality

import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { axiosWithAuth } from '../Utils/axiosWithAuth'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'


const Project = (props) => {

    const [projectData, setProjectData] = useState('')
    
    const { id } = useParams()
    const history = useHistory()

    

    useEffect(() => {
        axiosWithAuth()
            .get(`/entrepreneur/projects${id}`)
                .then((res)=> {
                    setProjectData(res.data)
                })
                .catch((error)=> {
                    console.log(error)
                })
    })

    const handleDeleteProject = (e) => {
        e.preventDefault()
        axiosWithAuth()
            .delete(`/projects/post/${id}`)
                .then((res)=>{
                    //set state
                    // setMainProjectData(res.data)
                    history.push('/dashboard')
                })
                .catch((error)=> {
                    console.log(error)
                })
    }

    return (
        <div>
            <h1> We are in Project.js</h1>
            <h2>Project Name: {projectData.projectName}</h2>
            <h3>Project Author: {projectData.author}</h3>
            <h4>Project Funding Goal: {projectData.fundingGoal}</h4>
            <h4>Project Description: {projectData.description}</h4>
            <button onClick={()=> history.push('/update-project')}>Edit</button>
            <button onClick={handleDeleteProject}>Delete</button>
        </div>
    )
}

export default Project
