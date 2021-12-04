import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


import { CheckboxUi } from "../../components/checkBox";

//import { initialValuesProducts } from "../../initialValues";
import { KindMovementsSchema } from "../../schema/kindmovementsSchema";
import { UseForm } from "../../components/form";
import { TextFieldUi } from "../../components/textfield";
import { Snackbars } from "../../components/snackbars";
import { initialFValuesTypes } from "../../types/initialFValues";
import { ButtonUi } from "../../components/button/index";
import { KindMovementsRequest } from "../../services/kindmovementsService";

import { FormikHelpers } from "formik";

import React from 'react';

import Divider from '@mui/material/Divider';

import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import { RadioButtonUi } from "../../components/radioButton";


export function UpdateMovements({ handleClose, setRefresh, refresh, data }: any) {
    const [severity, setSeverity] = React.useState("success");
    const [msg, setMsg] = React.useState("success");
    const [openn, setOpenn] = React.useState(false);
    //const [loading, setloading] = React.useState(false);

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
        //setloading(true)
        setdisablebtn(true)

        KindMovementsRequest.update(data.id, {
            name: values.name,
            description: values.description,
            iduser: 0,
            provider: values.provider,
            input: values.tipo === "Entrada" ? true : false,

            output: values.tipo === "Salida" ? true : false,
            return: values.tipo === "Devolucion" ? true : false
        }).then(e => {
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



    const formik = UseForm({
        name: data.name,
        description: data.description,
        iduser: data.iduser,
        provider: data.provider,
        tipo: data.input ? "Entrada" : data.output ? "Salida" : "Devolucion"
    }, KindMovementsSchema, onSubmit)


    return (
        <div>
            <Box component="form" onSubmit={formik.handleSubmit}>

                <Grid container spacing={2}>

                    <Grid item xs={12}>
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

                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.description}
                            label="Descripción *"
                            name="description"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.description}
                        />
                    </Grid>


                    <Grid item xs={5}>
                        <CheckboxUi
                            checked={formik.values.provider}
                            label='Requiere proveedor'
                            name="provider"
                            onChange={formik.handleChange}
                        />
                        
                    </Grid>

                    <Grid item xs={7}>
                        <RadioButtonUi
                            error={formik.errors.tipo}
                            label='Tipo'
                            name='tipo'
                            value={formik.values.tipo}
                            onChange={formik.handleChange}
                            content={<span>
                                <FormControlLabel value="Entrada" control={<Radio />} label="Entrada" />
                                <FormControlLabel value="Salida" control={<Radio />} label="Salida" />
                                <FormControlLabel value="Devolucion" control={<Radio />} label="Devolución" />
                            </span>}
                        />

                    </Grid>

                    

                    <Grid item xs={12}>
                       

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
                    <ButtonUi disabled={disablebtn} text="Enviar" type="submit"/>

                </Stack>


            </Box>
        </div>
    )

}