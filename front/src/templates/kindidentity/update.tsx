
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

//import { initialValuesProducts } from "../../initialValues";
import { KindIdSchema } from "../../schema/kindIdSchema";
import { UseForm } from "../../components/form";
import { TextFieldUi } from "../../components/textfield";
import { Snackbars } from "../../components/snackbars";
import { initialFValuesTypes } from "../../types/initialFValues";
import { ButtonUi } from "../../components/button/index";
import { KindIdRequest } from "../../services/KindIdentityService";

import { FormikHelpers } from "formik";

import React from 'react';

import Divider from '@mui/material/Divider';


export function UpdateKindId({ handleClose, setRefresh, refresh, data }: any) {
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

        KindIdRequest.update(data.id, {
            code_admin: values.code_admin,
            description: values.description
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
        code_admin: data.code,
        description: data.name
    }, KindIdSchema, onSubmit)


    return (
        <div>
            <Box component="form" onSubmit={formik.handleSubmit}>

                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={true}
                            error={formik.errors.description}
                            label="Nombre *"
                            name="description"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.description}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.code_admin}
                            label="Código *"
                            name="code_admin"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.code_admin}
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