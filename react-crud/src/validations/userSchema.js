import * as yup from "yup";

export const userSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    age: yup.number().required("Age is required").positive("Age must be positive").integer("Age must be an integer"),
});
