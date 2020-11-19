/////STRETCH//////

import React, {useState, useEffect} from 'react'
import styled  from 'styled-components'
import {Link} from 'react-router-dom'
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close'

import * as yup from 'yup'



// --------------- Basic Styling -------------------
const ForgotPswCard = styled.div`
    margin: auto;
    padding: 4em 1em 0 0;
    max-width: 100%;
    .hide {
        display:none
    }
    .show{
        display: inline;
    }
`
const ForgotPswInput = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    input {
        float: right;
        margin-top: 1em;
        display: block;
    }
    button {
        float: right;
        margin-top: 1em;
    }

`

const EmailSent = styled.div`
    margin: auto;
    padding: 4em 1em 0 0;
    max-width: 100%;
    p {
        text-align: right;
        display: block;
        margin-bottom: 0;
    }
    a {
        text-align: right;
        display: block;
        width: auto;
        text-decoration: underline;
        text-decoration-style: dotted;
        border-bottom-style: none;
    }
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
        <ForgotPswCard>
            <ForgotPswInput className={visible}>
                <label> Enter email to retrieve account:</label>
                <button onClick={()=> {
                    setVisible('hide');
                    setVisible2('show');
                }}>submit</button>
                <input
                    name = 'email'
                    type = 'email'
                    value = {emailForm.email}
                    onChange = {onChange}
                />
            </ForgotPswInput> 
            <EmailSent className={visible2}>
                {/* <CloseIcon onClick={()=> {hideForgotPsw(false)}}className='closeButton'/> */}
                <p>Thank you! Please check your email.</p>
                <Link>Resend Email</Link>
            </EmailSent>
        </ForgotPswCard>
    )
}

export default ForgotPassword