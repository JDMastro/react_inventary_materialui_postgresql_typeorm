import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { initialValuesProducts } from "../../initialValues";
import { ProductSchema } from "../../schema/ProductsSchema";
import { UseForm } from "../../components/form";
import { SelectWrapperUi } from "../../components/select";
import { TextFieldUi } from "../../components/textfield";
import { Snackbars } from "../../components/snackbars";
import { initialFValuesTypes } from "../../types/initialFValues";
import { ButtonUi } from "../../components/button/index";
import { ProductsRequest } from "../../services/productService";

import MenuItem from '@mui/material/MenuItem';
import { FormikHelpers } from "formik";

import React from 'react';

import Divider from '@mui/material/Divider';

export function AddProduct({ products, handleClose, units, setRefresh, refresh }: any) {
    const [severity, setSeverity] = React.useState("success");
    const [msg, setMsg] = React.useState("success");
    const [openn, setOpenn] = React.useState(false);

    const [disablebtn, setdisablebtn] = React.useState(false);

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

        setdisablebtn(true)
        ProductsRequest.save({
          name : values.name,
          description : values.description,
          sku : values.sku,
          code_bar : values.code_bar,
          current_existence : values.current_existence,
          reserved_quantity : values.reserved_quantity,
          purchase_unit_id : values.purchase_unit_id,
          sale_unit_id : values.sale_unit_id,
          product_parent_id : values.product_parent_id === "" ? 0 : values.product_parent_id,
          user_id : 0
        }).then(e => {
            console.log(e)
            setMsg("Save succesffuly")
            handleClick()
            
                setRefresh(!refresh)
                handleClose()
                setdisablebtn(false)
           
            
        })
            .catch(e => {
                setSeverity("error")
                setMsg("Something went wrong!!")
                handleClick()
                setdisablebtn(false)
            })
    }

    const formik = UseForm(initialValuesProducts, ProductSchema, onSubmit)

    return (
        <div>
            <Box component="form" onSubmit={formik.handleSubmit}>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={true}
                            error={formik.errors.name}
                            label="Nombre *"
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
                            error={formik.errors.current_existence}
                            label="Existencia actual *"
                            name="current_existence"
                            onChange={formik.handleChange}
                            type="number"
                            disabled={true}
                            value={formik.values.current_existence = '0'}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.reserved_quantity}
                            label="Cantidad reservada *"
                            name="reserved_quantity"
                            disabled={true}
                            onChange={formik.handleChange}
                            type="number"
                            value={formik.values.reserved_quantity = '0'}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <SelectWrapperUi
                            label='Unidad de compra'
                            name="purchase_unit_id"
                            value={formik.values.purchase_unit_id}
                            onChange={formik.handleChange}
                            error={formik.errors.purchase_unit_id}
                            menuItems={units.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name} : ${data.description}`}</MenuItem>)}

                        />
                    </Grid>

                    <Grid item xs={6}>
                        <SelectWrapperUi
                            label='Unidad de venta'
                            name="sale_unit_id"
                            value={formik.values.sale_unit_id}
                            onChange={formik.handleChange}
                            error={formik.errors.sale_unit_id}
                            menuItems={units.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name} : ${data.description}`}</MenuItem>)}

                        />
                    </Grid>

                    <Grid item xs={6}>
                        <SelectWrapperUi
                            label='Producto derivado'
                            name="product_parent_id"
                            value={formik.values.product_parent_id}
                            onChange={formik.handleChange}
                            error={formik.errors.product_parent_id}
                            menuItems={products.filter((e:any)=> e.isdererivado === false).map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}

                        />
                        <Divider style={{ marginTop : '15px' }} />
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
                    <ButtonUi disabled={disablebtn} text="Cancelar" type="button" onClick={handleClose} />
                    <ButtonUi disabled={disablebtn} text="Enviar" type="submit" />

                </Stack>

            </Box>
        </div>
    )
}

/*
<DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button type="submit" autoFocus>
                Agree
              </Button>
    </DialogActions>
*/

/*

sku: "",
  code: "",
  code_bar : "",
  name: "",
  description : "",
  existence : "",
  reservedquantity : "",
  unit: "",
  iduser : ""

*/