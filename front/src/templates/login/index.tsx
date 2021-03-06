import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormikHelpers } from "formik";


import { TextFieldUi } from "../../components/textfield";
import { ButtonUi } from "../../components/button";
import { UseForm } from "../../components/form";
import { Snackbars } from "../../components/snackbars";

import { initialFValuesTypes } from "../../types/initialFValues";
import { initialValuesSignIn } from "../../initialValues";
import { LoginSchema } from "../../schema/logInSchema";

import { UsersRequest } from "../../services/usersService";


import { useHistory } from "react-router-dom";


function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export function LogIn() {
    const [severity, setSeverity] = React.useState("success");
    const [disablebtn, setdisablebtn] = React.useState(false);
    const [msg, setMsg] = React.useState("success");
    const [openn, setOpenn] = React.useState(false);

    let history = useHistory();

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
        //history.push('/dashboard')
        console.log(values)
        setdisablebtn(true)
        UsersRequest.login({
            email: values.email_login,
            password: values.password_login
        }).then(e => {
            console.log(e)
            if (e.success) {
                handleClick()
                setdisablebtn(false)
                history.push('/dashboard')
            } else {
                handleClick()
                setMsg(e.error)
                setSeverity('error')
                setdisablebtn(false)
            }
        })
    }

    const formik = UseForm(initialValuesSignIn, LoginSchema, onSubmit)


    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>

                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <TextFieldUi
                                        autofocus={true}
                                        error={formik.errors.email_login}
                                        label="Correo *"
                                        name="email_login"
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.email_login}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextFieldUi
                                        autofocus={false}
                                        error={formik.errors.password_login}
                                        label="Contraseña *"
                                        name="password_login"
                                        onChange={formik.handleChange}
                                        type="password"
                                        value={formik.values.password_login}
                                    />




                                </Grid>

                                <Grid item xs={12}>

                                    <ButtonUi fullWidth={true} disabled={disablebtn} text="Enviar" type="submit" variant="contained" />

                                </Grid>




                            </Grid>

                            <Snackbars
                                msg={msg}
                                open={openn}
                                severity={severity}
                                handleClose={handleCloses}
                            />


                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}