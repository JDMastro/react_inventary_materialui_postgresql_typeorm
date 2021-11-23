import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const PersonSchema: initialFValuesTypes = yup.object({
    /*description : yup.string().required("this field is required!"),*/
    code : yup.string().required("this field is required!"),
    kind_id : yup.number().required("Field is required!"),
    idnumber : yup.number().required("Field is required!"),
    name : yup.string().required("this field is required!"),
    second_name : yup.string().required("this field is required!"),
    first_surname : yup.string().required("this field is required!"),
    second_surname : yup.string().required("this field is required!"),
    description : yup.string().required("this field is required!"),
    address : yup.string().required("this field is required!"),
    phone : yup.number().required("Field is required!"),
    contact : yup.string().required("this field is required!"),
    iduser : yup.number().required("Field is required!")
})