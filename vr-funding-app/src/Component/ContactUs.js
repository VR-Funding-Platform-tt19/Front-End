/////STRETCH//////

import React, {useState, useEffect} from 'react'
import * as yup from 'yup'
import {useHistory} from 'react-router-dom'

import axios from 'axios'

import { contactUsSchema } from './FormSchemas/contactUsSchema'


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

const initalDisabled = true

const initialListOfContactForms = []

const ContactUs = () => {
    const [listOfContactForms, setListOfContactForms] = useState(initialListOfContactForms)
    const [contactUsForm, setContactUsForm] = useState(initialContactUsForm)
    const [errors, setErrors] = useState(initialErrors)

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
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Want to get in touch?</h1>
                <Label>Name: {' '}</Label>
                <input
                name='name'
                type='text'
                placeholder='Please Enter Your Name'
                value={contactUsForm.name}
                onChange={handleChange}
                />

                <Label>Email: {' '}</Label>
                <input
                name='email'
                type='text'
                value={contactUsForm.email}
                placeholder='Please Enter Your Email'
                onChange={handleChange}
                />

                <Label>Message: {' '}</Label>
                <input
                name='message'
                type='text'
                value={contactUsForm.message}
                placeholder='Please tell us your message'
                onChange={handleChange}
                />
            </form>
            <button className='sendButton' disabled={disabled} onClick={()=> history.push('/contact-confirmation')}>Send</button>
        </div>
    )
}

export default ContactUs
