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
  kind_id: "",
  idnumber: "",
  name: "",
  second_name: "",
  first_surname: "",
  second_surname: "",
  address: "",
  phone: "",
  contact: "",
  provider : false
}

export const initialValuesUnits: initialFValuesTypes = {
  name: "",
  description: ""
}

export const initialValueskindmovements: initialFValuesTypes = {
  name : "",
  description : "",
  provider : false,
  tipo : ""
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

export const initialValuesSignIn: initialFValuesTypes = {
  email_login: "test@email.com",
  password_login: "Test123"
}


export const initialValuesUsers: initialFValuesTypes = {
  code: "",
  email: "",
  password: "",
  confirmpassword: ""
}

