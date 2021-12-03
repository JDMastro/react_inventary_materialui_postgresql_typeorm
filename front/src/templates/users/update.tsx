import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

//import { initialValuesProducts } from "../../initialValues";
import { UsersSchema } from "../../schema/usersSchema";
import { UseForm } from "../../components/form";
import { TextFieldUi } from "../../components/textfield";
import { Snackbars } from "../../components/snackbars";
import { initialFValuesTypes } from "../../types/initialFValues";
import { ButtonUi } from "../../components/button/index";
import { UsersRequest } from "../../services/usersService";

import { FormikHelpers } from "formik";


import React, { useEffect } from 'react';

import Divider from '@mui/material/Divider';


export function UpdateUser({ handleClose, setRefresh, refresh, data }: any) {
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

    useEffect(() => console.log(data))

    const onSubmit = async (values: initialFValuesTypes, formikHelpers: FormikHelpers<any>) => {
        //setloading(true)


        setdisablebtn(true)
        UsersRequest.update(data.id, {
            code: values.code,
            email: values.email,
            password: values.password
        }).then(e => {


            setMsg("Save succesffuly")
            handleClick()
            handleClose()
            setdisablebtn(false)
            setRefresh(!refresh)
        })
            .catch(e => {
                setSeverity("error")
                setMsg("Something went wrong!!")
                handleClick()
                setdisablebtn(false)
            })
    }



    const formik = UseForm({
        code: data.code,
        email: data.email,
        password: ""
    }, UsersSchema, onSubmit)


    return (
        <div>
            <Box component="form" onSubmit={formik.handleSubmit}>

                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={true}
                            error={formik.errors.code}
                            label="Codigo *"
                            name="code"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.code}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.email}
                            label="Correo *"
                            name="email"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.email}
                        />
                        <Divider style={{ marginTop: '15px' }} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.password}
                            label="Contraseña *"
                            name="password"
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                        />
                        <Divider style={{ marginTop: '15px' }} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.confirmpassword}
                            label="Confirma contraseña *"
                            name="confirmpassword"
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.confirmpassword}
                        />
                        <Divider style={{ marginTop: '15px' }} />
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