import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const KindMovementsSchema: initialFValuesTypes = yup.object({
   
    description : yup.string().required("Description is required!"),
    name : yup.string().required("Name is required!"),
    /*quantity : yup.number().required("Quantity is required!"),
    */
})