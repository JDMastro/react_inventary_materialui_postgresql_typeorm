import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const UsersSchema: initialFValuesTypes = yup.object({
    code: yup.string().required("Field is required!"),
    email: yup.string().email("Please enter a valid email address").required("Field is required!"),
    password: yup.string().matches(PASSWORD_REGEX, "Please enter a strong password").required(),


    confirmpassword: yup.string().required("Please confirm your password")
        .when("password", {
            is: (val: any) => (val && val.length > 0 ? true : false),
            then: yup
                .string()
                .oneOf([yup.ref("password")], "Password does not match"),
        }),
})