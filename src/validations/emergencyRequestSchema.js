import * as yup from "yup";

const emergencyRequestSchema = yup.object({
    content: yup.string().required('Content is required').max(500).min(8, 'Content must be at least 8 characters'),
    requestType: yup.number().required('Request type is required'),
})

export default emergencyRequestSchema;
