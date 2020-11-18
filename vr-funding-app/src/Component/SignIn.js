import React, {useState, useEffect} from 'react';

import * as yup from 'yup';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import axios from 'axios'

// ------- components -----------
import ForgotPassword from '../Component/ForgotPassword'
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

    const [ visible, setVisible ] = useState(false)




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
        axios
            .post('https://pedrocasuso-vr-funding-project.herokuapp.com/login', `grant_type=password&username=${credentials.username}&password=${credentials.password}`, {
                headers: {
                  // btoa is converting our client id/client secret into base64
                  Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((res)=> {
                // console.log(res)
                window.localStorage.setItem('token', res.data.access_token)
                history.push('/dashboard')
            })
            .catch((error)=>{
                console.log(error)
            })
    }

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
                <div className='forgotPassCard'>
                    {visible ? <ForgotPassword hideForgotPass={setVisible}/> : null}
                </div>
                <div className='signInButton'>
                    <button className='signInButton' disabled={disabled}>Sign In</button>
                    <button className='forgotPassButton' onClick={() => visible === true ? setVisible(false) : setVisible(true)}>Forgot Password</button>
                </div>
            </FormWrapper>
        </SignInPage>
    )
}

export default SignIn
