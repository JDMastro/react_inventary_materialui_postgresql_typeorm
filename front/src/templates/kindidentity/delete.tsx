
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import Divider from '@mui/material/Divider';


import { Snackbars } from "../../components/snackbars";
import { ButtonUi } from "../../components/button/index";
import { KindIdRequest } from "../../services/KindIdentityService";
import { Typography } from '@material-ui/core';
import React from 'react';


export function DeleteKindId({ handleClose, setRefresh, refresh, data }: any) {
    const [severity] = React.useState("success");
    const [msg, setMsg] = React.useState("success");
    const [openn, setOpenn] = React.useState(false);
    
    const handleCloses = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenn(false);
    };

    async function deleteProduct() {
        await KindIdRequest.delete(data.id)
        setMsg("Se eliminado correctaente")
        handleClick()
   
            handleClose()
            setRefresh(!refresh)
       
    }

    const handleClick = () => {
        setOpenn(true);
    };

    return (
        <div>
            <Box component="form">

                <Typography>{`¿Desea eliminar este registro ?`} </Typography>
                <Divider style={{ marginTop : '15px' }} />
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <ButtonUi disabled={false} text="Cancelar" type="button" onClick={handleClose} />
                    <ButtonUi disabled={false} text="Enviar" type="button" onClick={()=> deleteProduct()} />
                    
                </Stack>
                <Snackbars
                    msg={msg}
                    open={openn}
                    severity={severity}
                    handleClose={handleCloses}
                />

            </Box>
        </div>
    )
}
