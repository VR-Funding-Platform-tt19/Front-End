/////STRETCH//////

import React, {useState, useEffect} from 'react'
import * as yup from 'yup'
import {useHistory} from 'react-router-dom'

import axios from 'axios'
import styled from 'styled-components';

import { contactUsSchema } from './FormSchemas/contactUsSchema'


// ----- Form Styling ------
const ContactUsPage = styled.div`
    padding: 3em 5em 5em 5em;
    max-width: 100%;
    h1 {
        text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
    }
`;

const ContactCard = styled.form`
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


// ------ initial state --------
const initialContactUsForm = {
    name: '',
    email: '',
    message: '',
}

const initialErrors = {
    name: '',
    email: '',
    message: '',
}

const initialDisabled = true

const initialListOfContactForms = []

const ContactUs = () => {
    const [listOfContactForms, setListOfContactForms] = useState(initialListOfContactForms)
    const [contactUsForm, setContactUsForm] = useState(initialContactUsForm)
    const [errors, setErrors] = useState(initialErrors)
    const [disabled, setDisabled] = useState(initialDisabled)

    const history = useHistory()

    const inputChange = (name, value) => {
        yup
            .reach(contactUsSchema, name)
            .validate(value)
            .then(valid => {
                setErrors({
                    ...errors, [name]: ''})
            })
            .catch(err => {
                setErrors ({
                    ...errors, [name]: err.errors[0]
                })
            })
            
            setContactUsForm({
                ...contactUsForm, [name]: value
            })
           
    }

    const contactFormSubmit = () => {
        const newContactForm = {
            name: contactUsForm.name.trim(),
            email: contactUsForm.email.trim(),
            message: contactUsForm.message.trim(),
        }
        postNewContactForm(newContactForm)
    }

    //EVENT HANDLERS
    const handleChange = (event) => {
        const {name, value} = event.target
        inputChange(name, value)
    }


    const handleSubmit = (event) =>{
        event.preventDefault()
        contactFormSubmit()
    }


    const postNewContactForm = (newContactForm) => {
        // console.log(listOfContactForms)
        axios
            .post('https://reqres.in/api/ContactUs', newContactForm) // need the api endpoint
                .then(response => {
                    setListOfContactForms(listOfContactForms.concat(response.data))
                    // console.log(listOfContactForms)
                })
                .catch(error => {
                    console.log('THIS IS YOUR ERROR------------>', error)
                    // console.log(listOfContactForms)
                })
                . finally(() => {
                    setContactUsForm(initialContactUsForm)
                    // console.log(listOfContactForms)
                })
            
    }
    
    useEffect(() => {
        contactUsSchema.isValid(contactUsForm)
        .then(valid => {
            setDisabled(!valid);
        })
    }, [contactUsForm])


    return (
        <ContactUsPage>
            <h1 className="major">Want to get in touch?</h1>
            <ContactCard onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    name='name'
                    type='text'
                    placeholder='Please Enter Your Name'
                    value={contactUsForm.name}
                    onChange={handleChange}
                />
                <label>Email:</label>
                <input
                    name='email'
                    type='text'
                    value={contactUsForm.email}
                    placeholder='Please Enter Your Email'
                    onChange={handleChange}
                />
                <label>Message:</label>
                <textarea
                    name='message'
                    type='text'
                    value={contactUsForm.message}
                    placeholder='Please tell us your message'
                    onChange={handleChange}
                />
                <button className='sendButton' disabled={initialDisabled} onClick={()=> history.push('/contact-confirmation')}>Send</button>
            </ContactCard>
        </ContactUsPage>
    )
}

export default ContactUs
