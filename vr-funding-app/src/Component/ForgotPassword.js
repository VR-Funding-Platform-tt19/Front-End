/////STRETCH//////

import React, {useState, useEffect} from 'react'
import styled  from 'styled-components'
import {Link} from 'react-router-dom'
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close'

import * as yup from 'yup'



// --------------- Basic Styling -------------------
const ForgotPswCard = styled.div`
    background-color: mistyrose;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid black;
    z-index: 10;
    padding: 1%;
    width: 22%;
    position: absolute;
    box-shadow: 5px 5px 5px 5px darkgray;
    
    input{
        background: transparent;
        border: none;
        border-bottom: 1px solid red;
        outline: none;
    }
    button {
        margin-top: 3%;
        width: 35%;
        align-self: center;
    }
    .hide {
        display:none
    }
    .show{
        display:flex;
    }
    .closeButton{
        align-self: flex-end;
        color: black;
        border-radius: 50%;
        
        background-color: white;
        position: relative;
        width:23px;
        height: 23px;
        border: 2px solid white;
    }
`
const ForgotPswInput = styled.div`
    display:flex;
    flex-direction: column;
`

const EmailSent = styled.div`
    display:flex;
    flex-direction: column;
`
//--------------- initial state values --------------
const initialEmailFormvalue = {email: ''}

const ForgotPassword = (props) => {

    const { hideForgotPsw } = props
    
    // ---------- slices of state --------------------
    const [visible, setVisible] = useState('show') 
    const [visible2, setVisible2] = useState('hide')

    const[emailForm, setEmailForm] = useState(initialEmailFormvalue)

    // ----------- Event Handlers -----------------

    const onChange = (evt) => {
        const {name, value} = evt.target

        setEmailForm({...emailForm, [name]: value})
    }

    return (
        <div>
            <ForgotPswCard>
               <ForgotPswInput className={visible}>
                    <p> Enter email to retrieve account </p>
                    <input
                        name = 'email'
                        type = 'email'
                        value = {emailForm.email}
                        onChange = {onChange}
                    />
                    <button onClick={()=> {
                         setVisible('hide');
                         setVisible2('show');
                        }}>submit</button>
                </ForgotPswInput> 

                <EmailSent className={visible2}>
                    <CloseIcon onClick={()=> {hideForgotPsw(false)}}className='closeButton'/>
                    <p>Thank you! Please check your email.</p>
                    <Link>resend email </Link>
                 </EmailSent>
               
            </ForgotPswCard>        
        </div>
    )
}

export default ForgotPassword