import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const signupSchema = yup.object({
    email: yup.string().required('Email is required').max(50).min(8, 'Email must be at least 8 characters'),
    name: yup.string().required('Name is required').max(50).min(5),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').max(20),
    repeatPassword: yup.string().required('Repeat Password is required').min(8, 'Repeat Password must be at least 8 characters').max(20),
    phoneNumber: yup
        .string()
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr))
        .min(8).max(20)
        .matches(phoneRegExp, 'Phone number is invalid'),
    address: yup.string().required('Address is required').max(100).min(10, 'Address must be at least 10 characters'),
    dob: yup.date().required('Date of birth is required').max(new Date(), 'Date of birth must be in the past'),
})

export default signupSchema;
