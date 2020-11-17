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

    
    // -------- Event Handlers ---------



    return (
        <div>
            {/*  Build out a sign up (registration) form. The form
            should have:
                - name
                - password
                - funder or fundraiser checkbox
                - Any other pertinent info
            */}
        </div>
    )
}

export default SignUp
