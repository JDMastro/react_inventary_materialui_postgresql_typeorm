import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const movementsSchema: initialFValuesTypes = yup.object({
    /*nit : yup.string().required("Nit is required!"),
    name : yup.string().required("Name is required!"),*/
    kindmovements : yup.number().required("This field is required!"),
    idperson : yup.number().required("This field is required!"),
    numorder : yup.number().required("This field is required!"),
    idproduct : yup.number().required("This field is required!"),
    quantity : yup.number().required("This field is required!"),
         
    totalPrice : yup.number().required("This field is required!"),
    //unitprice : yup.number().required("This field is required!"),
})



/*current_existence: yup.number().required("Field is required!"),
.positive()
         .max(yup.ref('current_existence'))
         .min(1),*/