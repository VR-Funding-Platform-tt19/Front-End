import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {axiosWithAuth} from '../Utils/axiosWithAuth';
import * as yup from 'yup';
import styled from 'styled-components';
import axios from 'axios'


// ----- Form Schema ------
import { signUpFormSchema } from './FormSchemas/signUpFormSchema'

// ----- Form Styling ------
const SignUpPage = styled.div`
  padding: 3em 5em 5em 5em;
  max-width: 100%;
  height:85vh;
  h1 {
    text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
  }
`

const FormWrapper = styled.form`
  .inputField {
    margin: 1rem;
  }
  label {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    text-align: right;
  }
  .textBox {
    margin-left: 10px;
    flex: 0 0 200px;
  }
  .checkBox {
      margin-top: 8px;
  }
  button {
    float: right;
  }
  .error {
      color: #b74e91;
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
                    alert('Username or Password is already in use') // alerts if 
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
            <div className='inputField'>
                <label className='error'>{signUpErrors.username}</label>
                <label className='error'>{signUpErrors.password}</label>
            </div>
            <div className='inputField'>
                <label>Username: 
                    <input
                        name='username'
                        type='text'
                        value={signUpForm.username}
                        onChange={inputChange}
                        placeholder='Enter your username'
                        className='textBox'
                    />
                </label>
            </div>
            <div className='inputField'>
                <label>Password: 
                    <input
                        name='password'
                        type='password'
                        value={signUpForm.password}
                        onChange={inputChange}
                        placeholder='Enter your password'
                        className='textBox'
                    />
                </label>
            </div>
            {/* <div className='inputField'>
                <label>Funder account: 
                    <input
                        name='funder'
                        type='checkbox'
                        checked={signUpForm.funder}
                        onChange={inputChange}
                        className='checkBox'
                    />
                </label>
            </div> */}
            <div className='inputField'>
                <button className='signInButton' disabled={disabled}>Sign Up</button>
            </div>
        </FormWrapper>
    </SignUpPage>
    )
}

export default SignUp
