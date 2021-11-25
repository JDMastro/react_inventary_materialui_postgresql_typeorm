import { initialFValuesTypes } from "../types/initialFValues";

export const initialValuesProducts: initialFValuesTypes = {
  name : "",
  description : "",
  sku : "",
  code_bar: "",
  current_existence: "",
  reserved_quantity: "",
  purchase_unit_id: "",
  sale_unit_id: "",
  product_parent_id : '',
}

export const initialValuesKindId: initialFValuesTypes = {
  code_admin: "",
  description: ""
}

export const initialValuesPerson: initialFValuesTypes = {
  code: "",
  kind_id: "",
  idnumber: "",
  name: "",
  second_name: "",
  first_surname: "",
  second_surname: "",
  description: "",
  address: "",
  phone: "",
  contact: "",
  iduser: "",
  provider : false
}

export const initialValuesUnits: initialFValuesTypes = {
  name: "",
  description: ""
}

export const initialValueskindmovements: initialFValuesTypes = {
  name : "",
  description : "",
  iduser : "",
  provider : false,
  entry : false
}

export const initialValuesMovements: initialFValuesTypes = {
    kindmovements : "",
    idperson :    "",
    numorder :    "",
    idproduct :   "",
    quantity : "",
    totalPrice: "",
    unitprice : ""
}

