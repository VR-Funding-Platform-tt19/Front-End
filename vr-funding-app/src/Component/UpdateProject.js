import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {axiosWithAuth} from '../Utils/axiosWithAuth'
import styled from 'styled-components'

// ----- Form Styling ------
const UpdateProjectPage = styled.div`
  padding: 3em 5em 5em 5em;
  max-width: 100%;
  height: 82vh;
  overflow: hidden;
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

const UpdateProjectCard = styled.form`
    width: 25em;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 2em;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.25);
	transition: box-shadow 0.2s ease;

    .inputForm input {
        width: 100%;
    }
    .inputForm label {
        float: left;
        margin-right: .5em;       
    }
    .inputForm span {
        display: block;
        overflow: hidden;
    }
    .finishEdit {
        display: flex;
        justify-content: center;
        padding-top: 1em;
    }
`;

//SETTING INITIAL VALUES

const initialProjectValues = {
    projectname:'',
    author:'',
    description:'',
    fundedamt:0,
}


const UpdateProject = (props) => {
    // const { name, image, author, description, amount} = props
    //SETTING INITIAL FORM STATE
    const [projectValues, setProjectValues] = useState(initialProjectValues)

    
    
    const {id} = useParams()

    

    //USE EFFECT AXIOSWITHAUTH()CALL FOR ID
    useEffect(()=>{
            
            axiosWithAuth()
            .get(`/entrepreneurs/projects`)
            .then(res=>{
                console.log(res.data)
                const project = res.data.find((proj)=> proj.projectid == id) // do not change to ===
                
                console.log('This is original GET------------>', project)
                console.log('This is original AMOUNT------------>', project.fundedamt)
                setProjectValues({
                "projectname": project.projectname,
                "author": project.author,
                "description": project.description,
                "projectimage": project.projectimage,
                "fundedamt": project.fundedamt})
            })
            .catch(error=>{
                console.log('THIS IS YOUR ERROR----->', error)
            })  
    },[])
    console.log(projectValues)

    //HELPER FUNCTIONS
    const history = useHistory()

    console.log(projectValues)
    //EVENT HANDLERS
    const handleChange = (event) =>{
       
        setProjectValues({
            ...projectValues,
            [event.target.name]: event.target.value
        })

    }
    
    const handleSubmit = (event) =>{
        console.log(projectValues)
        console.log('FUNDED AMOUNT------->',projectValues.fundedamt)
        console.log('THIS IS THE ID', id)
        event.preventDefault()
        axiosWithAuth()
            .put(`projects/post/${id}`, projectValues)
                .then(res=>{
                    console.log(res.data)
                    history.push('/dashboard')
                })
                .catch(error=>{
                    console.log('THIS IS YOUR ERROR-------->', error)
            })
        
    }
    return(
        <UpdateProjectPage>
            <h1 className="major">Edit Project</h1>
            <div className='projectCardWrapper'>
                <UpdateProjectCard onSubmit={handleSubmit}>
                <div className='inputForm'>
                        <label>Name:</label>
                        <span>
                            <input
                                name='projectname'
                                type='text'
                                value={projectValues.projectname}
                                onChange={handleChange}
                            />
                        </span>
                    </div>
                    <div className='inputForm'>
                        <label>Author:</label>
                        <span>
                            <input
                                name='author'
                                type='text'
                                value={projectValues.author}
                                onChange={handleChange}
                            />
                        </span>
                    </div>
                    <div className='inputForm'>
                    <label>Description: </label>
                        <span>
                            <input
                                name='description'
                                type='text'
                                value={projectValues.description}
                                onChange={handleChange}
                            />
                        </span>
                    </div>
                    <div className='inputForm'>
                        <label>Funding Goal: </label>
                        <span>
                            <input
                                name='fundedamt'
                                type='number'
                                value={projectValues.fundedamt}
                                onChange={handleChange}
                            />
                        </span>
                    </div>
                    <div className='finishEdit'>
                        <button>Finish Editing</button>
                    </div>
                </UpdateProjectCard>
            </div>

        </UpdateProjectPage> 
    )
}
    


export default UpdateProject
