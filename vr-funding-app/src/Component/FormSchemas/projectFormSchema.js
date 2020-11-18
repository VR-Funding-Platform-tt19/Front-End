import * as yup from 'yup';

export const projectFormSchema = yup.object().shape({
    projectname: yup
        .string()
        .min(5, 'Title must be more than 5 characters')
        .max(40, 'Title cant be more than 40 characters')
        .required('Please enter a tile for your project.'),
    author: yup
        .string()
        .min(3, 'Password must be at least 3 characters')
        .required('Please enter an Author name.'),
    description: yup
        .string()
        .min(100, 'Please give us more information about your project')
        .max(400, 'Your description can not exceed 400 characters')
        .required('Please describe your fundraising project.'),
    fundedamt: yup
        .number()
        .required('Please enter a funding amount'),
})
