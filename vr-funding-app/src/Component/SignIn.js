import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as yup from 'yup';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';


// ----- Need to create? ------
// import { saveUsername } from '../store/actions/saveUsernameAction';
// import { saveUserID } from '../store/actions/saveUserIdAction';
// ----- Need to import ? -----
// import { connect } from 'react-redux';


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
    const [signInForm, setSignInForm] = useState(initSignInForm);
    const [signInErrors, setSignInErrors] = useState(initSignInErrors);
    const [disabled, setDisabled] = useState(initDisabled);

    // uncomment when forgotPassCard is enabled
    // const [visible, setVisible] = useState(false);

    // uncomment when { connect } from 'react-redux' is imported ?
    // const { saveUsername, saveUserId } = props;


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
    };
    

    const signInFormSubmit = (event) => {
        event.preventDefault();
        const newSignInForm = {
            username: signInForm.username.trim(),
            password: signInForm.password.trim()
        };
        postNewSignInForm(newSignInForm);
    };    

    // !!---These functions require '../store/actions/saveUserIdAction'---!!
    //
    // const saveUserIdFunc = () => {
    //     return(
    //         axios
    //             .get(/*--insert API URL for saving user id--*/)
    //             .then(response => {
    //                 saveUserIdFunc(response.data.userid)
    //             })
    //             .catch(error => {
    //                 console.log(error)
    //             })
    //     );
    // };
    //
    // const postNewSignInForm = newSignInForm => {
    //     axios.post(/*--insert login URL--*/, `grant_type=password&username=${signInForm.username}&password=${signInform.password}`, {
    //         headers: {
    //             Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`, 
    //             'Content-Type': 'application/x-www/form-urlencoded'
    //         }
    //     })
    //         .then(result => {
    //             window.localStorage.setItem('token', result.data.access_token);
    //             saveUsername(signInForm.username);
    //             saveUserIdFunction();
    //             history.push(/*--insert where user goes next--*/);
    //         })
    //         .catch(error => {
    //             console.log('There is an error', error);
    //         })
    //         .finally(() => {
    //             setSignInForm(initSignInForm);
    //         })
    // };

    useEffect(() => {
        signInFormSchema.isValid(signInForm)
        .then(valid => {
            setDisabled(!valid);
        })
    }, [signInForm]);


    
    
    return (
        <SignInPage>
            <FormWrapper onSubmit={ signInFormSubmit }>
                <h1>VR Funding</h1>
                <label>Username: 
                    <input
                        name='username'
                        type='text'
                        value={signInForm.username}
                        onChange={inputChange}
                    />
                </label>
                <div>{signInErrors.username}</div>
                <label>Password: 
                    <input
                        name='password'
                        type='text'
                        value={signInForm.password}
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


// uncomment when { connect } from 'react-redux' is imported ?
// const mapStateToProps = state => {
//     return {
//         userid: state.saveUserId.userid,
//         username: state.saveUsername.username
//     };
// };
//
// export default connect(mapStateToProps, { saveUserId, saveUsername })(SignIn);

export default SignIn

