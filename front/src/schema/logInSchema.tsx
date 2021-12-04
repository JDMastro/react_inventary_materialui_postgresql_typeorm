import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const LoginSchema: initialFValuesTypes = yup.object({
    email_login: yup.string().email("Please enter a valid email address").required("Field is required!"),
    password_login: yup.string().required("Field is required!")
})