import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const ProductSchema: initialFValuesTypes = yup.object({
  name : yup.string().required("Field is required!"),
  description : yup.string().required("Field is required!"),
  sku : yup.string().required("Field is required!"),
  code_bar: yup.string().required("Field is required!"),
  current_existence: yup.number().required("Field is required!"),
  reserved_quantity: yup.number().required("Field is required!"),
  purchase_unit_id: yup.number().required("Field is required!"),
  sale_unit_id: yup.number().required("Field is required!"),
   
})