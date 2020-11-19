// Notes:
// This component when rendered will give the information of just one project
// You will have an 'Edit' and 'Delete' buttons with functionality

import React, { useState, useEffect} from 'react'
import styled from 'styled-components'



import { axiosWithAuth } from '../Utils/axiosWithAuth'
import { useHistory, useParams } from 'react-router-dom'
import UpdateProject from './UpdateProject'


const ProjectPage = styled.div`
  padding: 3em 5em 5em 5em;
  max-width: 100%;
  height: 85vh;
  h1 {
    text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
  }
  .projectCardWrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ProjectWrapper = styled.div`
    width: 25em;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 2em;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.25);
	transition: box-shadow 0.2s ease;
    p {
        margin: auto;
    }

    img {
        max-width: 100%;
        max-height: 100%;
    }
    .buttonCluster {
        display: flex;
        justify-content: center;
        padding-top: 1em;
    }
    .buttonCluster button {
        margin: 0 .5em 0 .5em;
    }
`;


const Project = (props) => {
    const [hidden, setHidden] = useState(true)
    
    const onShowEdit = () => setHidden(false)

    const [projectData, setProjectData] = useState('')
    

    
    const { id } = useParams()
    const history = useHistory()

    // console.log(projectData)
    // const projects = projectData    
    // console.log(projects)
    // console.log(id)
    // const idA = id
    // console.log(idA)
    
    // const projectA = projects.find((proj)=> proj.projectid == id )
    // console.log(projectA)

    console.log(projectData)
    useEffect(() => {
        axiosWithAuth()
            .get('/entrepreneurs/projects')
                .then((res)=> {
                    console.log(res.data)
                    const project = res.data.find((proj)=> proj.projectid == id) // do not change to ===
                    setProjectData(project)
                })
                .catch((error)=> {
                    console.log(error)
                })
    },[])
    console.log(id)
    const handleDeleteProject = (e) => {
        console.log(projectData)
        e.preventDefault()
        axiosWithAuth()
            .delete('/projects/post/' + id)
                .then((res)=>{
                    //set state
                    // setMainProjectData(res.data)
                    history.push('/dashboard')
                })
                .catch((error)=> {
                    console.log(error)
                })
    }
console.log(projectData.projectname, projectData.author, projectData.projectimage, projectData.description, projectData.fundedamt )
    return (
        <ProjectPage>
            <h1 className="major">Your Project</h1>
            <div className='projectCardWrapper'>
                <ProjectWrapper>
                    <div>
                        <p>Name: {projectData.projectname}</p>
                        <p>Author: {projectData.author}</p>
                        <p>Description: {projectData.description}</p>
                        <p>Funding Goal: {projectData.fundedamt}</p>
                    </div>
                    <div className = 'buttonCluster'>
                    <button onClick={()=> history.push(`/update-project/${projectData.projectid}`) && onShowEdit()}>Edit</button>
                        {/* <button onClick={setVisible(!visible)}>Edit</button> */}
                        <button onClick={handleDeleteProject}>Delete</button>
                    </div>
                    {/* Notes: 
                        Option 1: Pass below props to </UpdateProject> without rendering component
                        Option 2: How to conditionaly render that component  */}
                </ProjectWrapper>
                <div className='hidden'>
                    {hidden ? null : <UpdateProject name={projectData.projectname} author={projectData.author} 
                    image={projectData.projectimage} description={projectData.description} amount={projectData.fundedamt}/>}
                </div>
            </div>
        </ProjectPage>
    )
}

export default Project
