import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const CompanySchema: initialFValuesTypes = yup.object({
    nit : yup.string().required("Nit is required!"),
    name : yup.string().required("Name is required!"),
})