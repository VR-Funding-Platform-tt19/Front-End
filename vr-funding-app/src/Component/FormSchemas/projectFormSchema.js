import * as yup from 'yup';

export const projectFormSchema = yup.object().shape({
    projectName: yup
        .string()
        .required('Please enter a tile for your project.')
        .min(5, 'Title must be more than 5 characters')
        .max(40, 'Title cant be more than 40 characters'),
    author: yup
        .string()
        .required('Please enter an Author name.')
        .min(3, 'Password must be at least 3 characters'),
    description: yup
        .string()
        .required('Please describe your fundraising project.')
        .min(100, 'Please give us more information about your project')
        .max(400, 'Your description can not exceed 400 characters'),
    fundingGoal: yup
        .required('Please enter a funding amount')
        .number(),
})