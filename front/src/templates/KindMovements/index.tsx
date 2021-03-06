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



import { KindMovementsRequest } from "../../services/kindmovementsService";
import { StatusRequest } from "../../services/statusService";


import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { Addkindmovements } from "./add";
import { UpdateMovements } from "./update";
import { Deletemovements } from "./delete";

import Fab from '@mui/material/Fab';
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';


export function KindMovements() {
    const [openModalUpdate, setOpenModalUpdate] = React.useState(false);
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false)
    const [rows, setrows] = React.useState([]);
    const [data, setdata] = React.useState({});

    const [status, setstatus] = React.useState([]);

    useEffect(() => {
        KindMovementsRequest.getAll()
            .then(e => setrows(e))
    }, [refresh])

    useEffect(()=>{
        StatusRequest.getStatus()
             .then(e => setstatus(e) )
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
                        <Typography>Tipo de movimiento</Typography>
                        {/*<IconButton onClick={handleClickOpenModalAdd} aria-label="add" ><AddIcon fontSize="small" /></IconButton>*/}

                    </Stack>


                    <TableNormalUi
                        tableHead={
                            <TableRow >

                                <TableCell align="left" style={{ fontWeight : 'bold' }}>Id</TableCell>
                                <TableCell align="left" style={{ fontWeight : 'bold' }}>Nombre</TableCell>
                                <TableCell align="left" style={{ fontWeight : 'bold' }}>Descripci??n</TableCell>
                                <TableCell align="left" style={{ fontWeight : 'bold' }}>Acci??n</TableCell>
                            </TableRow>
                        }
                        tableBody={
                            rows.map((data: any, i: any) =>
                                <TableRow
                                    key={data.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell component="th" scope="row">{data.id}</TableCell>
                                    <TableCell align="left">{data.name}</TableCell>
                                    <TableCell align="left">{data.description}</TableCell>
                                    <TableCell align="left">
                                        <Stack direction="row" alignItems="center">
                                            <IconButton aria-label="update" onClick={() => handleClickOpenModalUpdate(data)}><EditIcon color="primary" fontSize="small" /></IconButton>
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
                content={<UpdateMovements status={status} handleClose={handleCloseModalUpdate} setRefresh={setRefresh} refresh={refresh} data={data} />}
                open={openModalUpdate}
                title="Edit"
            />

            <AlertDialogUi
                handleClose={handleCloseModalDelete}
                content={<Deletemovements handleClose={handleCloseModalDelete} setRefresh={setRefresh} refresh={refresh} data={data} />}
                open={openModalDelete}
                title="Delete"
            />

            <AlertDialogUi
                handleClose={handleCloseModalAdd}
                content={<Addkindmovements status={status} refresh={refresh} setRefresh={setRefresh} handleClose={handleCloseModalAdd} />}
                open={openModalAdd}
                title="Add"
            />
        </Box>
    )
}