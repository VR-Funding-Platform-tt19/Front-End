// Notes:
// This component when rendered will give the information of just one project
// You will have an 'Edit' and 'Delete' buttons with functionality

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { axiosWithAuth } from '../Utils/axiosWithAuth'
import { useHistory, useParams } from 'react-router-dom'


const Project = () => {

    const [projectData, setProjectData] = useState('')
    
    const { id } = useParams()

    const history = useHistory()

    useEffect(() => {
        // axiosWithAuth()
        axios
            .get(`Need add get url with id of project ${id}`)
                .then((res)=> {
                    setProjectData(res.data)
                    // redirect user to ____________
                    // history.push('')
                })
                .catch((error)=> {
                    console.log(error)
                })
    })

    return (
        <div>
            <h1> We are in Project.js</h1>
            <h2>Project Name: {projectData.projectName}</h2>
            <h3>Project Author: {projectData.author}</h3>
            <h4>Project Funding Goal: {projectData.fundingGoal}</h4>
            <h4>Project Description: {projectData.description}</h4>
        </div>
    )
}

export default Project
