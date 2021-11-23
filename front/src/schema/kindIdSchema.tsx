import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const KindIdSchema: initialFValuesTypes = yup.object({
    description : yup.string().required("this field is required!"),
})