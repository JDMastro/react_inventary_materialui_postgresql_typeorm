import { useEffect, useState } from "react"
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
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { TableNormalUi } from "../../components/tableNormal";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


//import InputAdornment from '@mui/material/InputAdornment';

import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

import { FormikHelpers } from "formik";


export function AddMovements({ kindmov, persons, products, handleClose, setRefresh, refresh }: any) {

    const [order] = useState<initialFValuesTypes>([]);
    const [disable, setdisable] = useState(false)

    const onSubmit = async (values: initialFValuesTypes, formikHelpers: FormikHelpers<any>) => {
        console.log(values)
        order.push(values)


        setdisable(true)
        formikHelpers.setFieldValue("quantity", "")
        formikHelpers.setFieldValue("totalPrice", "")
        formikHelpers.setFieldValue("unitprice", "")


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
                            onChange={formik.handleChange}
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
                            menuItems={persons.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}

                        />
                    </Grid>

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


                   

                 

                    <Grid item xs={12}>
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
                            error={formik.errors.quantity}
                            label="Cantidad *"
                            name="quantity"
                            onChange={formik.handleChange}
                            type="number"
                            value={formik.values.quantity}
                            inputInside={formik.values.idproduct !== "" ? products.find((e: any) => e.id === formik.values.idproduct).unit.name : ""}
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

                    <Grid item xs={3}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.unitprice}
                            label="Precio Unitario *"
                            name="unitprice"
                            onChange={formik.handleChange}
                            type="number"
                            value={formik.values.unitprice}
                            inputInside={formik.values.idproduct !== "" ? products.find((e: any) => e.id === formik.values.idproduct).unit.name : ""}
                        />
                    </Grid>

                    <Grid item xs={2} style={{ marginTop: "2px" }}>
                        <ButtonUi variant="contained" disabled={false} text="Save" type="submit" Icon={<SaveIcon fontSize="small" />} />

                    </Grid>




                </Grid>
            </Box>

            <Box style={{ marginTop: "5px" }}>
                <TableNormalUi
                    tableHead={
                        <TableRow >

                            <TableCell align="center">Tipo de Movimiento</TableCell>
                            <TableCell align="center">Producto</TableCell>
                            <TableCell align="center">Cantidad</TableCell>
                            <TableCell align="center">Precio Total</TableCell>
                            <TableCell align="center">Precio unitario</TableCell>
                            <TableCell align="center">ACCIÓN</TableCell>
                        </TableRow>
                    }
                    tableBody={
                        order.map((e: any, i: any) =>
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell align="center">{kindmov.find((s: any) => s.id === e.kindmovements).name}</TableCell>
                                <TableCell align="center">{products.find((s: any) => s.id === e.idproduct).name}</TableCell>
                                <TableCell align="center">{e.quantity}</TableCell>
                                <TableCell align="center">{e.totalPrice}</TableCell>
                                <TableCell align="center">{e.unitprice}</TableCell>
                                <TableCell align="center"><IconButton aria-label="delete"  ><DeleteIcon fontSize="small" /></IconButton></TableCell>
                            </TableRow>
                        )

                    }
                />
            </Box>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
            >
                <ButtonUi disabled={false} text="cancel" type="button" onClick={handleClose} Icon={<CancelIcon fontSize="small" />} />
                <ButtonUi disabled={false} text="send" type="button" Icon={<SendIcon fontSize="small" />} />

            </Stack>

        </div>
    )

}