import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { initialValuesDerivate } from "../../initialValues";
import { ProductDerivateSchema } from "../../schema/productDerivateSchema";
import { UseForm } from "../../components/form";
import { SelectWrapperUi } from "../../components/select";
import { TextFieldUi } from "../../components/textfield";
import { Snackbars } from "../../components/snackbars";
import { initialFValuesTypes } from "../../types/initialFValues";
import { ButtonUi } from "../../components/button/index";
import { ProductsDerivateRequest } from "../../services/productDerivateService";

import MenuItem from '@mui/material/MenuItem';
import { FormikHelpers } from "formik";


import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import React from 'react';

export function AddFormProductD({products, refresh, setRefresh, units, handleClose}: any)
{
    const [severity, setSeverity] = React.useState("success");
    const [msg, setMsg] = React.useState("success");
    const [openn, setOpenn] = React.useState(false);
    
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
       
        console.log(values)
        ProductsDerivateRequest.save({
            sku: values.sku,
            code: values.code,
            code_bar : values.code_bar,
            name: values.name,
            description : values.description,
            existence : values.existence,
            reservedquantity : values.reservedquantity,
            unit: values.unit,
            iduser : values.iduser,
            product_id : values.product_id,
            quantityunit : values.quantityunit
        }).then(e => {
            console.log(e)
            setMsg("Save succesffuly")
            handleClick()
            setTimeout(() => {
                setRefresh(!refresh)
                handleClose()
            }, 3000);
            
        })
            .catch(e => {
                setSeverity("error")
                setMsg("Something went wrong!!")
                handleClick()
            })
    }

    const formik = UseForm(initialValuesDerivate, ProductDerivateSchema, onSubmit)

    return (
        <div>
            <Box component="form" onSubmit={formik.handleSubmit}>

                <Grid container spacing={2}>

                <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={true}
                            error={formik.errors.sku}
                            label="Sku *"
                            name="sku"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.sku}
                        />
                    </Grid>
                    
                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.code}
                            label="Code *"
                            name="code"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.code}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.code_bar}
                            label="Code Bar *"
                            name="code_bar"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.code_bar}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.name}
                            label="Name *"
                            name="name"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.name}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.description}
                            label="Description *"
                            name="description"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.description}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.existence}
                            label="Existence *"
                            name="existence"
                            onChange={formik.handleChange}
                            type="number"
                            value={formik.values.existence}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.reservedquantity}
                            label="Reserved Quantity *"
                            name="reservedquantity"
                            onChange={formik.handleChange}
                            type="number"
                            value={formik.values.reservedquantity}
                        />
                    </Grid>     

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.iduser}
                            label="Iduser *"
                            name="iduser"
                            onChange={formik.handleChange}
                            type="number"
                            value={formik.values.iduser}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.quantityunit}
                            label="Quantity unit *"
                            name="quantityunit"
                            onChange={formik.handleChange}
                            type="number"
                            value={formik.values.quantityunit}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SelectWrapperUi
                        label='Producto'
                            name="product_id"
                            value={formik.values.product_id}
                            onChange={formik.handleChange}
                            error={formik.errors.product_id}
                            menuItems={products.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name} : ${data.description}`}</MenuItem>)}

                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SelectWrapperUi
                        label='Unidad'
                            name="unit"
                            value={formik.values.unit}
                            onChange={formik.handleChange}
                            error={formik.errors.unit}
                            menuItems={units.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name} : ${data.description}`}</MenuItem>)}

                        />
                    </Grid>

                    

                   

                </Grid>

                <Snackbars
                    msg={msg}
                    open={openn}
                    severity={severity}
                    handleClose={handleCloses}
                />

<Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <ButtonUi disabled={false} text="cancel" type="button" onClick={handleClose} Icon={<CancelIcon fontSize="small" />} />
                    <ButtonUi disabled={false} text="send" type="submit" Icon={<SendIcon fontSize="small" />} />

                </Stack>

            </Box>
        </div>
    )
}