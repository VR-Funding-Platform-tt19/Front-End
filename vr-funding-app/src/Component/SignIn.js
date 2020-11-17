import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as yup from 'yup';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../Utils/axiosWithAuth'


// ----- Form Schema ------
import { signInFormSchema } from './FormSchemas/signInFormSchema';


// ----- Form Styling ------
const SignInPage = styled.div`
`

const FormWrapper = styled.form`
`

// ---- Initial State -------

// default sign in values
const initSignInForm = {
    username: '',
    password: ''
};

// default error values
const initSignInErrors = {
    username: '',
    password: ''
};

// initial value of submit button
const initDisabled = true;

const SignIn = (props) => {

    // ----- component state -----
    const [credentials, setCredentials] = useState(initSignInForm);
    
    const [signInErrors, setSignInErrors] = useState(initSignInErrors);
    
    const [disabled, setDisabled] = useState(initDisabled);




    // ----- helper functions -----
    const history = useHistory();
    

    // ----- event handlers -----
    const inputChange = (event) => {
        const { name, value } = event.target;
        yup
            .reach(signInFormSchema, name)
            .validate(value)
            .then(valid => {
                setSignInErrors({
                    ...signInErrors, [name]:''
                })
            })
            .catch(error => {
                setSignInErrors({
                    ...signInErrors, [name]: error.errors[0]
                })
            })

            setCredentials({
                ...credentials,
                [event.target.name]: event.target.value
            })
    };
    

    const login = (event) => {
        event.preventDefault();
        
        axiosWithAuth()
            .post('api hook', credentials)
                .then((res)=> {
                    window.localStorage.setItem('token', res.data.payload)
                    history.push('/dashboard')
                })
                .catch((error)=>{
                    console.log(error)
                })
    };    

   

    useEffect(() => {
        signInFormSchema.isValid(credentials)
        .then(valid => {
            setDisabled(!valid);
        })
    }, [credentials]);


    
    
    return (
        <SignInPage>
            <FormWrapper onSubmit={ login }>
                <h1>VR Funding</h1>
                <label>Username: 
                    <input
                        name='username'
                        type='text'
                        value={credentials.username}
                        onChange={inputChange}
                    />
                </label>
                <div>{signInErrors.username}</div>
                <label>Password: 
                    <input
                        name='password'
                        type='password'
                        value={credentials.password}
                        onChange={inputChange}
                    />
                </label>
                <div>{signInErrors.password}</div>
                {/* <div className='forgotPassCard'>
                    {visible ? <ForgotPassword hideForgotPass={setVisible}/> : null}
                </div> */}
                <button className='signInButtom' disabled={disabled}>Sign In</button>
                {/* <button className='forgotPassButton' onClick={() => visible === true ? setVisible(false) : setVisible(true)}>Forgot Password</button> */}
            </FormWrapper>
        </SignInPage>
    )
}

export default SignIn
