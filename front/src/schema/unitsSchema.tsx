import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const UnitsSchema: initialFValuesTypes = yup.object({
    name: yup.string().required("Field is required!"),
    description: yup.string().required("Field is required!")
})