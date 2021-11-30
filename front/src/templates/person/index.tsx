import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import { CardUi } from "../../components/card";
import { TableNormalUi } from "../../components/tableNormal";
import { AlertDialogUi } from "../../components/dialog";
//import UpdateIcon from '@mui/icons-material/Update';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { Avatar, Typography } from "@mui/material";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import { personRequest } from "../../services/personService";
import { KindIdRequest } from "../../services/KindIdentityService";


import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { AddPerson } from "./add";
import { UpdatePerson } from "./update";
import { DeletePerson } from "./delete";

import Fab from '@mui/material/Fab';
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';

export function Person() {
    const [openModalUpdate, setOpenModalUpdate] = React.useState(false);
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false)
    const [rows, setrows] = React.useState([]);
    const [kind, setkind] = React.useState([]);
    const [data, setdata] = React.useState({});

    useEffect(() => {
        personRequest.getAll()
            .then(e => setrows(e))
    }, [refresh])

    useEffect(() => {
        KindIdRequest.getAll()
            .then(e => setkind(e))
    }, [])

    const handleClickOpenModalUpdate = (data: any) => {
        setdata(data)
        setOpenModalUpdate(true);
    };

    const handleCloseModalUpdate = () => {
        setOpenModalUpdate(false);
    };

    const handleClickOpenModalDelete = (data: any) => {
        setdata(data)
        setOpenModalDelete(true);
    };

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
    };

    const handleClickOpenModalAdd = () => {
        setOpenModalAdd(true);
    };

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
    };


    return (
        <Box sx={{ p: 2 }}>
            <CardUi content={
                <Box sx={{ p: 3 }}>

                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar>
                            <SupervisedUserCircleIcon />
                        </Avatar>
                        <Typography>Personas</Typography>
                        {/*<IconButton onClick={handleClickOpenModalAdd} aria-label="add" ><AddIcon  fontSize="small" /></IconButton>*/}

                    </Stack>
                    <TableNormalUi
                        tableHead={
                            <TableRow >
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="left">Tipo De Identificación</TableCell>
                                <TableCell align="left">Identificación</TableCell>
                                <TableCell align="left">Nombre Completo</TableCell>
                                <TableCell align="left">Tipo</TableCell>
                                <TableCell align="left">Dirección</TableCell>
                                <TableCell align="left">Teléfono</TableCell>
                                <TableCell align="left">Contacto</TableCell>
                                <TableCell align="left">Acción</TableCell>
                            </TableRow>
                        }
                        tableBody={
                            rows.map((data: any, i: any) =>
                                <TableRow
                                    key={data.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell align="left" component="th" scope="row">{data.id}</TableCell>
                                    <TableCell align="left" component="th" scope="row">{data.Kindidentity.name}</TableCell>
                                    <TableCell align="left" component="th" scope="row">{data.idnumber}</TableCell>
                                    <TableCell align="left" component="th" scope="row">{data.fullname}</TableCell>
                                    <TableCell align="left" component="th" scope="row">{data.provider ? "Proveedor" : "Cliente" }</TableCell>
                                    <TableCell align="left" component="th" scope="row">{data.address}</TableCell>
                                    <TableCell align="left" component="th" scope="row">{data.phone}</TableCell>
                                    <TableCell align="left" component="th" scope="row">{data.contact}</TableCell>

                                    <TableCell align="left">
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <IconButton aria-label="update" onClick={() => handleClickOpenModalUpdate(data)}><EditIcon fontSize="small" color="primary" /></IconButton>
                                            <IconButton aria-label="delete" onClick={() => handleClickOpenModalDelete(data)} ><DeleteIcon fontSize="small" sx={{ color: red[700] }} /></IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    />
                    {/*<TableUi columns={columns} rows={rows} />*/}

                </Box>} />

                <Fab sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                bgcolor: green[600],
                '&:hover': {
                    bgcolor: green[500],
                  },
            }} size="small" color="primary" onClick={handleClickOpenModalAdd}  aria-label="add">
                <AddIcon />
            </Fab>

            <AlertDialogUi
                handleClose={handleCloseModalUpdate}
                content={<UpdatePerson kind={kind} handleClose={handleCloseModalUpdate} setRefresh={setRefresh} refresh={refresh} data={data} />}
                open={openModalUpdate}
                title=""
            />

            <AlertDialogUi
                handleClose={handleCloseModalDelete}
                content={<DeletePerson handleClose={handleCloseModalDelete} setRefresh={setRefresh} refresh={refresh} data={data} />}
                open={openModalDelete}
                title=""
            />

            <AlertDialogUi
                handleClose={handleCloseModalAdd}
                content={<AddPerson refresh={refresh} kind={kind} setRefresh={setRefresh} handleClose={handleCloseModalAdd} />}
                open={openModalAdd}
                title=""
            />
        </Box>
    )
}