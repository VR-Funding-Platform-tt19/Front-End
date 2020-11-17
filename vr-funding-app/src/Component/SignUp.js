import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import styled from 'styled-components';

// ----- Form Schema ------
import { signUpFormSchema } from './FormSchemas/signUpFormSchema'

// ----- Form Styling ------
const SignUpPage = styled.div`
`

const FormWrapper = styled.form`
`

// ------ initial state --------

// default sign in values
const initSignUpForm = {
    username: '',
    password: '',
    funder: false
};

// default error values
const initSignUpErrors = {
    username: '',
    password: '',
    funder: '' 
};

// initial value of submit button 
const initDisabled = true;

const SignUp = () => {
    
    // -------- component state ----------
    const [signUpForm, setSignUpForm] = useState(initSignUpForm);
    const [signUpErrors, setSignUpErrors] = useState(initSignUpErrors);
    const [disabled, setDisabled] = useState(initDisabled);

    
    // ----- helper functions -----
    const history = useHistory();

    // -------- event Handlers ---------
    const inputChange = (event) => {
        const {name, value} = event.target;
        yup
        .reach(signUpFormSchema, name)
        .validate(value)
        .then(valid => {
            setSignUpErrors({
                ...signUpErrors, [name]:''
            })
        })
        .catch(error => {
            setSignUpErrors({
                ...signUpErrors, [name]: error.errors
            })
        });
        setSignUpForm({
            ...signUpForm, [name]: value
        });
    };


    const signUpSubmit = (event) => {
        event.preventDefault();
        axios.post(/*---insert api url for sign up---*/, signUpForm)
            .then(response => {
                window.localStorage.setItem('token', response.data.payload);
                alert('Successfully registered');
                history.push(/*---insert path to profile---*/)
            })
            .catch(error => {
                console.log('There is an error', error);
            });
        setSignUpForm(initSignUpForm);
    };


    useEffect(() => {
        signUpFormSchema.isValid(signUpForm)
        .then(valid => {
            setDisabled(!valid);
        });
    }, [signUpForm]);


    return (
        <SignUpPage>
            <FormWrapper>
                <h1>VR Funding</h1>
                <label>Username: 
                    <input
                        name='username'
                        type='text'
                        value={signUpForm.username}
                        onChange={inputChange}
                        placeholder='Enter your username'
                    />
                </label>
                <div>{signInErrors.username}</div>
                <label>Password: 
                    <input
                        name='password'
                        type='text'
                        value={signUpForm.password}
                        onChange={inputChange}
                        placeholder='Enter your password'
                    />
                </label>
                <div>{signInErrors.password}</div>
                <label>Funder account: 
                    <input
                        name='funder'
                        type='checkbox'
                        checked={signUpForm.funder}
                        onChange={inputChange}
                    />
                </label>
                <button className='signInButton' disabled={disabled}>Sign Up</button>
            </FormWrapper>
            {/*  Build out a sign up (registration) form. The form
            should have:
                - name
                - password
                - funder or fundraiser checkbox
                - Any other pertinent info
            */}
        </SignUpPage>
    )
}

export default SignUp
