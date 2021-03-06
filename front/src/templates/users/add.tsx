import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


import { initialValuesUsers } from "../../initialValues";
import { UsersSchema } from "../../schema/usersSchema";
import { UseForm } from "../../components/form";
import { TextFieldUi } from "../../components/textfield";
import { Snackbars } from "../../components/snackbars";
import { initialFValuesTypes } from "../../types/initialFValues";
import { ButtonUi } from "../../components/button/index";
import { UsersRequest } from "../../services/usersService";

import { FormikHelpers } from "formik";

import React from 'react';



export function AddUsers({ handleClose, setRefresh, refresh }: any) {
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
        UsersRequest.register({
            code: values.code,
            email: values.email,
            password: values.password
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

    const formik = UseForm(initialValuesUsers, UsersSchema, onSubmit)

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
                    </Grid>

                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.password}
                            label="Contrase??a *"
                            name="password"
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.confirmpassword}
                            label="Confirma contrase??a *"
                            name="confirmpassword"
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.confirmpassword}
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
                    <ButtonUi disabled={disablebtn} text="Cancelar" type="button" onClick={handleClose} />
                    <ButtonUi disabled={disablebtn} text="Enviar" type="submit" />

                </Stack>


            </Box>
        </div>
    )

}