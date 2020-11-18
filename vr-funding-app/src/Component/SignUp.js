import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {axiosWithAuth} from '../Utils/axiosWithAuth';
import axios from 'axios'
import * as yup from 'yup';
import styled from 'styled-components';


// ----- Form Schema ------
import { signUpFormSchema } from './FormSchemas/signUpFormSchema'

// ----- Form Styling ------
const SignUpPage = styled.div`
  padding: 3em 5em 5em 5em;
  max-width: 100%;
`;

const FormWrapper = styled.form`
  .textField {
    margin: 1rem;
  }
  label {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    text-align: right;
  }
  input {
    margin-left: 10px;
    flex: 0 0 200px;
  }
  .signUpButton {
    float: right;
    margin-right: 10px;
  }
`;

// ------ initial state --------

// default sign in values
const initSignUpForm = {
    username: '',
    password: '',
};

// default error values
const initSignUpErrors = {
    username: '',
    password: '', 
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
            ...signUpForm, 
            [name]: value
        });
    };

    //Note:
    // Not sure if this is the right axios request
    const signUpSubmit = (e) => {
        e.preventDefault();
        console.log(signUpForm)
        axios
            .post('https://pedrocasuso-vr-funding-project.herokuapp.com/createnewuser',signUpForm)
                .then(response => {
                    window.localStorage.setItem('token', response.data.payload);
                    alert('Successfully registered');
                    history.push('/sign-in')
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
        <h1 className="major">Sign Up</h1>
        <FormWrapper onSubmit={signUpSubmit}>
            <div>{signUpErrors.username}</div>
            <div>{signUpErrors.password}</div>
            <div className='textField'>
                <label>Username: 
                    <input
                        name='username'
                        type='text'
                        value={signUpForm.username}
                        onChange={inputChange}
                        placeholder='Enter your username'
                    />
                </label>
            </div>
            <div className='textField'>
                <label>Password: 
                    <input
                        name='password'
                        type='password'
                        value={signUpForm.password}
                        onChange={inputChange}
                        placeholder='Enter your password'
                    />
                </label>
            </div>
            <div className='textField'>
                <label>Funder account: 
                    <input
                        name='funder'
                        type='checkbox'
                        checked={signUpForm.funder}
                        onChange={inputChange}
                    />
                </label>
            </div>
            <div className='signUpButton'>
                <button className='signInButton' disabled={disabled}>Sign Up</button>
            </div>
            
        </FormWrapper>
    </SignUpPage>
    )
}

export default SignUp
