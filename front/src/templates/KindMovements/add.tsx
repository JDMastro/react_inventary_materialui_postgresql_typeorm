import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


import { CheckboxUi } from "../../components/checkBox";


import { initialValueskindmovements } from "../../initialValues";
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
import { ContactSupportOutlined } from '@mui/icons-material';


export function Addkindmovements({ handleClose, setRefresh, refresh }: any) {
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
        console.log(values)
        /*KindMovementsRequest.save({
            name: values.name,
            description: values.description,
            iduser: 0,
            provider: values.provider,
            entry: values.entry
        }).then(e => {
            console.log(e)
            setMsg("Save succesffuly")
            handleClick()
           
                setRefresh(!refresh)
                handleClose()
                setdisablebtn(false)
                setdisablebtn(false)
           

        })
            .catch(e => {
                setSeverity("error")
                setMsg("Something went wrong!!")
                handleClick()
            })*/
    }

    const formik = UseForm(initialValueskindmovements, KindMovementsSchema, onSubmit)

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

                    <Grid item xs={12}>
                        <CheckboxUi
                            checked={formik.values.provider}
                            label='Requiere proveedor'
                            name="provider"
                            onChange={formik.handleChange}
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