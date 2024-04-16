import * as yup from "yup";

const loginSchema = yup.object({
    email: yup.string().required('Email is required').max(50).min(8, 'Email must be at least 8 characters'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').max(20),
})

export default loginSchema;
