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
                        <IconButton onClick={handleClickOpenModalAdd} aria-label="add" ><AddIcon  fontSize="small" /></IconButton>

                    </Stack>
                    <TableNormalUi
                        tableHead={
                            <TableRow >
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">CODIGO</TableCell>
                                <TableCell align="center">TIPO ID</TableCell>
                                <TableCell align="center">NUMERO ID</TableCell>
                                <TableCell align="center">PRIMER NOMBRE</TableCell>
                                <TableCell align="center">SEGUNDO NOMBRE</TableCell>
                                <TableCell align="center">PRIMER APELLIDO</TableCell>
                                <TableCell align="center">SEGUNDO APELLIDO</TableCell>
                                <TableCell align="center">NOMBRE COMPLETO</TableCell>
                                <TableCell align="center">DESCRIPCION</TableCell>
                                <TableCell align="center">DIRECCION</TableCell>
                                <TableCell align="center">TELEFONO</TableCell>
                                <TableCell align="center">CONTACTO</TableCell>
                                <TableCell align="center">ACCION</TableCell>
                            </TableRow>
                        }
                        tableBody={
                            rows.map((data: any, i: any) =>
                                <TableRow
                                    key={data.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell component="th" scope="row">{data.id}</TableCell>
                                    <TableCell component="th" scope="row">{data.code}</TableCell>
                                    <TableCell component="th" scope="row">{data.Kindidentity.description}</TableCell>
                                    <TableCell component="th" scope="row">{data.idnumber}</TableCell>
                                    <TableCell component="th" scope="row">{data.name}</TableCell>
                                    <TableCell component="th" scope="row">{data.second_name}</TableCell>
                                    <TableCell component="th" scope="row">{data.first_surname}</TableCell>
                                    <TableCell component="th" scope="row">{data.second_surname}</TableCell>
                                    <TableCell component="th" scope="row">{data.fullname}</TableCell>
                                    <TableCell component="th" scope="row">{data.description}</TableCell>
                                    <TableCell component="th" scope="row">{data.address}</TableCell>
                                    <TableCell component="th" scope="row">{data.phone}</TableCell>
                                    <TableCell component="th" scope="row">{data.contact}</TableCell>

                                    <TableCell align="center">
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <IconButton aria-label="update" onClick={() => handleClickOpenModalUpdate(data)}><EditIcon fontSize="small" /></IconButton>
                                            <IconButton aria-label="delete" onClick={() => handleClickOpenModalDelete(data)} ><DeleteIcon fontSize="small" /></IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    />
                    {/*<TableUi columns={columns} rows={rows} />*/}

                </Box>} />

            <AlertDialogUi
                handleClose={handleCloseModalUpdate}
                content={<UpdatePerson kind={kind} handleClose={handleCloseModalUpdate} setRefresh={setRefresh} refresh={refresh} data={data} />}
                open={openModalUpdate}
                title="Edit"
            />

            <AlertDialogUi
                handleClose={handleCloseModalDelete}
                content={<DeletePerson handleClose={handleCloseModalDelete} setRefresh={setRefresh} refresh={refresh} data={data} />}
                open={openModalDelete}
                title="Delete"
            />

            <AlertDialogUi
                handleClose={handleCloseModalAdd}
                content={<AddPerson refresh={refresh} kind={kind} setRefresh={setRefresh} handleClose={handleCloseModalAdd} />}
                open={openModalAdd}
                title="Add"
            />
        </Box>
    )
}