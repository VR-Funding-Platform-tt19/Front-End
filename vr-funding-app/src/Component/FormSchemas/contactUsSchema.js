import * as yup from 'yup'



export const contactUsSchema = yup.object().shape({
    name: yup
        .string()
        .required('Must include a name'),
    email: yup
        .string()
        .email('Must be valid email address')
        .required('Must include email address'),
    message: yup
        .string()
        .required('Must include a message')
})