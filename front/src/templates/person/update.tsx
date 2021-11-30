import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

//import { initialValuesProducts } from "../../initialValues";
import { PersonSchema } from "../../schema/perosnSchema";
import { UseForm } from "../../components/form";
import { SelectWrapperUi } from "../../components/select";
import { TextFieldUi } from "../../components/textfield";
import { Snackbars } from "../../components/snackbars";
import { CheckboxUi } from "../../components/checkBox";
import { initialFValuesTypes } from "../../types/initialFValues";
import { ButtonUi } from "../../components/button/index";
import { personRequest } from "../../services/personService";

import MenuItem from '@mui/material/MenuItem';
import { FormikHelpers } from "formik";

import React from 'react';

import Divider from '@mui/material/Divider';




export function UpdatePerson({ handleClose, kind, setRefresh, refresh, data }: any) {
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
        personRequest.update(data.id, {
            kind_id: values.kind_id,
            idnumber: values.idnumber,
            name: values.name,
            second_name: values.second_name,
            first_surname: values.first_surname,
            second_surname: values.second_surname,
            address: values.address,
            phone: values.phone,
            contact: values.contact,
            iduser: values.iduser,
            provider : values.provider
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
        kind_id: data.kind_id,
        idnumber: data.idnumber,
        name: data.name,
        second_name: data.second_name,
        first_surname: data.first_surname,
        second_surname: data.second_surname,
        address: data.address,
        phone: data.phone,
        contact: data.contact,
        iduser: 0,
        provider : data.provider
    }, PersonSchema, onSubmit)

    return (
        <div>
            <Box component="form" onSubmit={formik.handleSubmit}>

                <Grid container spacing={2}>



                  

                    <Grid item xs={6}>
                        <SelectWrapperUi
                            label='Tipo de identificacion'
                            name="kind_id"
                            value={formik.values.kind_id}
                            onChange={formik.handleChange}
                            error={formik.errors.kind_id}
                            defaultValue={formik.values.kind_id}
                            menuItems={kind.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name} ${data.code}`}</MenuItem>)}

                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.idnumber}
                            label="Numero de identificacion *"
                            name="idnumber"
                            onChange={formik.handleChange}
                            type="number"
                            value={formik.values.idnumber}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
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
                            error={formik.errors.second_name}
                            label="Segundo nombre *"
                            name="second_name"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.second_name}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.first_surname}
                            label="Primer apellido *"
                            name="first_surname"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.first_surname}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.second_surname}
                            label="Segundo apellido *"
                            name="second_surname"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.second_surname}
                        />
                    </Grid>

                   
                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.address}
                            label="Direccion *"
                            name="address"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.address}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.phone}
                            label="Telefono *"
                            name="phone"
                            onChange={formik.handleChange}
                            type="number"
                            value={formik.values.phone}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.contact}
                            label="Contacto *"
                            name="contact"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.contact}
                        />
                    </Grid>

                    


                    <Grid item xs={12}>
                      <CheckboxUi
                      checked={formik.values.provider}
                      label='Proveedor'
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