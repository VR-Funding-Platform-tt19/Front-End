import * as yup from 'yup';

export const signInFormSchema = yup.object().shape({
    username: yup
        .string()
        .required('Please enter a username')
        .min(5, 'Username must be at least 5 characters'),
    password: yup
        .string()
        .required('Please enter a password')
        .min(3, 'Password must be at least 3 characters')
})