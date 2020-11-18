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
  .signInButton {
    float: right;
    margin-right: 10px;
  }
`;

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
    
    // Note: 
    // Not sure if this is the right axios request?
    const login = (event) => {
        event.preventDefault();
        
        axiosWithAuth()
            .post('/createnewuser', credentials)
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
            <h1 className="major">Sign In</h1>
            <FormWrapper onSubmit={ login }>
            <div>{signInErrors.username}</div>
            <div>{signInErrors.password}</div>
            <div className='textField'>
                <label>Username: 
                    <input
                        name='username'
                        type='text'
                        value={credentials.username}
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
                        value={credentials.password}
                        onChange={inputChange}
                        placeholder='Enter your password'
                    />
                </label>
            </div>                
                {/* <div className='forgotPassCard'>
                    {visible ? <ForgotPassword hideForgotPass={setVisible}/> : null}
                </div> */}
            <div className='signInButton'>
                <button className='signInButton' disabled={disabled}>Sign In</button>
            </div>
                {/* <button className='forgotPassButton' onClick={() => visible === true ? setVisible(false) : setVisible(true)}>Forgot Password</button> */}
            </FormWrapper>
        </SignInPage>
    )
}

export default SignIn
