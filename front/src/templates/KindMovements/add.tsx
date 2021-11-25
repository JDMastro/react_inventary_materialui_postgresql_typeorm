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


import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import React from 'react';


export function Addkindmovements({ handleClose, setRefresh, refresh }: any) {
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
        KindMovementsRequest.save({
            name: values.name,
            description: values.description,
            iduser: values.iduser,
            provider: values.provider,
            entry: values.entry
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
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.iduser}
                            label="Id User *"
                            name="iduser"
                            onChange={formik.handleChange}
                            type="number"
                            value={formik.values.iduser}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <CheckboxUi
                            checked={formik.values.provider}
                            label='Proveedor'
                            name="provider"
                            onChange={formik.handleChange}
                        />
                         <CheckboxUi
                            checked={formik.values.entry}
                            label='Entrada'
                            name="entry"
                            onChange={formik.handleChange}
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