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

import { UnitsRequest } from "../../services/unitService";


import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { AddUnits } from "./add";
import { UpdateUnit } from "./update";
import { DeleteUnits } from "./delete";


export function Units() {
    const [openModalUpdate, setOpenModalUpdate] = React.useState(false);
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false)
    const [rows, setrows] = React.useState([]);
    const [data, setdata] = React.useState({});

    useEffect(() => {
        UnitsRequest.getUnits()
            .then(e => setrows(e))
    }, [refresh])

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
                        <Typography>Unidades</Typography>
                        <IconButton onClick={handleClickOpenModalAdd} aria-label="add" ><AddIcon fontSize="small" /></IconButton>

                    </Stack>
                    <TableNormalUi
                        tableHead={
                            <TableRow >

                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Sigla</TableCell>
                                <TableCell align="center">Nombre</TableCell>
                                <TableCell align="center">Acción</TableCell>
                            </TableRow>
                        }
                        tableBody={
                            rows.map((data: any, i: any) =>
                                <TableRow
                                    key={data.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell component="th" scope="row">{data.id}</TableCell>
                                    <TableCell align="center">{data.name}</TableCell>
                                    <TableCell align="center">{data.description}</TableCell>

                                    <TableCell align="right">
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
                content={<UpdateUnit handleClose={handleCloseModalUpdate} setRefresh={setRefresh} refresh={refresh} data={data} />}
                open={openModalUpdate}
                title="Edit"
            />

            <AlertDialogUi
                handleClose={handleCloseModalDelete}
                content={<DeleteUnits handleClose={handleCloseModalDelete} setRefresh={setRefresh} refresh={refresh} data={data} />}
                open={openModalDelete}
                title="Delete"
            />

            <AlertDialogUi
                handleClose={handleCloseModalAdd}
                content={<AddUnits refresh={refresh} setRefresh={setRefresh} handleClose={handleCloseModalAdd} />}
                open={openModalAdd}
                title="Add"
            />
        </Box>
    )
}