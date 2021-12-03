import { useState } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';

import { initialValuesMovements } from "../../initialValues";
import { movementsSchema } from "../../schema/movementsSchema";
import { UseForm } from "../../components/form";
import { TextFieldUi } from "../../components/textfield";
import { Snackbars } from "../../components/snackbars";
import { initialFValuesTypes } from "../../types/initialFValues";
import { ButtonUi } from "../../components/button/index";
import { SelectWrapperUi } from "../../components/select";

import MenuItem from '@mui/material/MenuItem';
//import TableCell from '@mui/material/TableCell';
//import TableRow from '@mui/material/TableRow';

//import { TableNormalUi } from "../../components/tableNormal";
//import IconButton from '@mui/material/IconButton';
//import DeleteIcon from '@mui/icons-material/Delete';


//import InputAdornment from '@mui/material/InputAdornment';


import { FormikHelpers } from "formik";

import { ProductsRequest } from "../../services/productService";
import { personRequest } from "../../services/personService";
import { MovementsRequest } from "../../services/MovementsService";

import { AddTable } from "./addTable";
import { isArray } from "util";


export function AddMovements({ kindmov, handleClose, setRefresh, refresh }: any) {

    const [disable, setdisable] = useState(false)
    const [products, setproducts] = useState<any>([])
    const [Persons, setPersons] = useState([])

    const [disablebtns, setdisablebtns] = useState(false)

    const [severity, setSeverity] = useState("success");
    const [msg, setMsg] = useState("success");
    const [openn, setOpenn] = useState(false);
    const [movements, setmovements] = useState([]);

    const handleCloses = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenn(false);
    };

    const handleClick = () => {
        setOpenn(true);
    };

    const onSubmit = async (values: initialFValuesTypes, formikHelpers: FormikHelpers<any>) => {


        setdisablebtns(true)

        MovementsRequest.save({
            kindMovements_id: values.kindmovements,
            personOrProvider_id: values.idperson,
            number_order: values.numorder,
            product_id: values.idproduct,
            quantity: values.quantity,
            totalPurchasePrice: values.totalPrice,
            unitPrice: formik.values.unitprice
        }).then(e => {
            console.log(e)
            

            /*setRefresh(!refresh)
            handleClick()
            findNumberOrder(values.numorder)*/

            if (!e.data || isArray(e.data)) {
                setMsg("Save succesffuly")
                setRefresh(!refresh)
                handleClick()
                findNumberOrder(values.numorder)
            }else{
                formik.setFieldError("quantity", e.data.error.quantity)
            }

            
                
               







        })
            .catch(e => {
                setSeverity("error")
                setMsg("Something went wrong!!")
                handleClick()

            })



        setdisablebtns(false)
        setdisable(true)
        formikHelpers.setFieldValue("quantity", "")
        formikHelpers.setFieldValue("totalPrice", "")
        formikHelpers.setFieldValue("unitprice", "")


    }

    const findNumberOrder = (order: number) => {

        MovementsRequest.findNumberOrder(order)
            .then(e => setmovements(e ? e : [] ))

    }

    const formik = UseForm(initialValuesMovements, movementsSchema, onSubmit)


    return (
        <div>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <SelectWrapperUi
                            name="kindmovements"
                            disabled={disable}
                            value={formik.values.kindmovements}
                            onChange={(evt: any) => {
                                formik.handleChange(evt)
                                const kind = kindmov.find((e: any) => e.id === evt.target.value)
                                formik.setFieldValue("idproduct", "")
                                formik.setFieldValue("idperson", "")
                                ProductsRequest.findByKindMovement(!kind.provider).then(ke => setproducts(ke))
                                personRequest.findByKindMovement(kind.provider).then(pe => setPersons(pe))
                            }

                            }
                            error={formik.errors.kindmovements}
                            label="Tipo de movimientos"
                            menuItems={kindmov.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}

                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SelectWrapperUi
                            name="idperson"
                            disabled={disable}
                            value={formik.values.idperson}
                            onChange={formik.handleChange}
                            error={formik.errors.idperson}
                            label="Proveedor o Cliente"
                            menuItems={
                                Persons.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.fullname}`}</MenuItem>)
                            }

                        />
                    </Grid>


                    {/*persons.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)*/}

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={true}
                            error={formik.errors.numorder}
                            label="No Orden *"
                            name="numorder"
                            onChange={formik.handleChange}
                            type="number"
                            value={formik.values.numorder}
                            disabled={disable}
                        />
                    </Grid>






                    <Grid item xs={9}>
                        <SelectWrapperUi
                            name="idproduct"
                            value={formik.values.idproduct}
                            onChange={formik.handleChange}
                            error={formik.errors.idproduct}
                            label="Producto"
                            menuItems={products.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}
                        />
                    </Grid>



                    <Grid item xs={3}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.current_existence}
                            label="existencia actual *"
                            name="current_existence"
                            onChange={formik.handleChange}
                            type="number"
                            disabled={true}
                            value={formik.values.idproduct !== "" && products.find((e: any) => e.id === formik.values.idproduct) ? formik.values.current_existence = products.find((e: any) => e.id === formik.values.idproduct).current_existence : ""}
                        />
                    </Grid>





                    <Grid item xs={3}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.quantity}
                            label="Cantidad *"
                            name="quantity"
                            onChange={formik.handleChange}
                            type="number"
                            value={formik.values.quantity}
                            inputInside={
                                formik.values.idproduct !== "" && products.find((e: any) => e.id === formik.values.idproduct) ?
                                    kindmov.find((e: any) => e.id === formik.values.kindmovements).provider ? (
                                        products.find((e: any) => e.id === formik.values.idproduct).unit_purchase.name
                                    ) : (
                                        products.find((e: any) => e.id === formik.values.idproduct).unit_sale.name
                                    )
                                    : ""
                            }
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.totalPrice}
                            label="Precio total de compra *"
                            name="totalPrice"
                            onChange={formik.handleChange}
                            type="number"
                            value={formik.values.totalPrice}
                        />
                    </Grid>


                    {/*  formik.values.unitprice = ""+formik.values.totalPrice / formik.values.quantity */}


                    <Grid item xs={3}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.unitprice}
                            label="Precio Unitario *"
                            name="unitprice"
                            onChange={formik.handleChange}
                            type="number"
                            value={
                                formik.values.totalPrice !== "" && formik.values.quantity !== "" ?
                                    formik.values.unitprice = "" + formik.values.totalPrice / formik.values.quantity : formik.values.unitprice
                            }
                            disabled={true}
                            inputInside={
                                formik.values.idproduct !== "" && products.find((e: any) => e.id === formik.values.idproduct) ?
                                    kindmov.find((e: any) => e.id === formik.values.kindmovements).provider ? (
                                        products.find((e: any) => e.id === formik.values.idproduct).unit_purchase.name
                                    ) : (
                                        products.find((e: any) => e.id === formik.values.idproduct).unit_sale.name
                                    )
                                    : ""
                            }
                        />
                    </Grid>
                    {/*  formik.values.idproduct !== "" ? products.find((e: any) => e.id === formik.values.idproduct).unit.name : "" */}

                    <Grid item xs={2} style={{ marginTop: "2px" }}>
                        <ButtonUi variant="contained" disabled={disablebtns} text="Save" type="submit" Icon={<SaveIcon fontSize="small" />} />

                    </Grid>




                </Grid>
            </Box>

            {/* --------------------------------*/}

            <AddTable movements={movements} findNumberOrder={findNumberOrder} number_order={formik.values.numorder} />

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
            >
                <ButtonUi disabled={disablebtns} text="cancel" type="button" onClick={handleClose} />
                <ButtonUi disabled={disablebtns} text="send" type="button" />

            </Stack>


            <Snackbars
                msg={msg}
                open={openn}
                severity={severity}
                handleClose={handleCloses}
            />


        </div>
    )

}

/*

formik.values.kindmovements !== "" ? (
                                    kindmov.find((e : any )=> e.id === formik.values.kindmovements).provider ? (persons.find((e : any )=> e.provider === true ).map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>))
                                    : (persons.find((e : any )=> e.provider === false ).map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>))
                                ) : (<span>Seleccione un tipo de movimiento</span>)

*/