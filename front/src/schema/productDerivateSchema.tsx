import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const ProductDerivateSchema: initialFValuesTypes = yup.object({
    sku: yup.string().required("Field is required!"),
    code: yup.string().required("Field is required!"),
    code_bar : yup.string().required("Field is required!"),
    name: yup.string().required("Field is required!"),
    description : yup.string().required("Field is required!"),
    existence : yup.number().required("Field is required!"),
    reservedquantity : yup.number().required("Field is required!"),
    unit: yup.number().required("Field is required!"),
    iduser : yup.number().required("Field is required!"),
    product_id: yup.number().required("Field is required!"),
    quantityunit : yup.number().required("Field is required!")
    /*description : yup.string().required("Description is required!"),
    name : yup.string().required("Name is required!"),
    quantity : yup.number().required("Quantity is required!"),
    idunit : yup.number().required("Unit is required!")*/
})