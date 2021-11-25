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

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

//import { personRequest } from "../../services/personService";
//import { ProductsRequest } from "../../services/productService";
import { KindMovementsRequest } from "../../services/kindmovementsService";

import { AddMovements } from "./add";


export function Movements()
{
    //const [openModalUpdate, setOpenModalUpdate] = React.useState(false);
    //const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false)
   // const [rows, setrows] = React.useState([]);
   // const [data, setdata] = React.useState({});

   // const [persons, setpersons] = React.useState([]);
   // const [products, setproducts] = React.useState([]);
    const [kindmov, setkindmov] = React.useState([]);

    useEffect(()=>{
        KindMovementsRequest.getAll().then(e => setkindmov(e) )
    },[])

    /*useEffect(() => {
        KindIdRequest.getAll()
            .then(e => setrows(e))
    }, [refresh])*/

    /*const handleClickOpenModalUpdate = (data: any) => {
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
    };*/

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
                        <Typography>Movimientos</Typography>
                        <IconButton onClick={handleClickOpenModalAdd} aria-label="add" ><AddIcon fontSize="small" /></IconButton>

                    </Stack>
                    <TableNormalUi
                        tableHead={
                            <TableRow >

                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">DESCRIPCIÓN</TableCell>
                                <TableCell align="center">CODIGO ADMIN</TableCell>
                                <TableCell align="center">ACCIÓN</TableCell>
                            </TableRow>
                        }
                        tableBody={
                                <TableRow
                                    key={1}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell component="th" scope="row">1</TableCell>
                                    <TableCell align="center">ssss</TableCell>
                                    <TableCell align="center">aaa</TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <IconButton aria-label="update" ><EditIcon fontSize="small" /></IconButton>
                                            <IconButton aria-label="delete"  ><DeleteIcon fontSize="small" /></IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            
                        }
                    />
                    {/*<TableUi columns={columns} rows={rows} />*/}

                </Box>} />

            {/*<AlertDialogUi
                handleClose={handleCloseModalUpdate}
                content={<UpdateKindId handleClose={handleCloseModalUpdate} setRefresh={setRefresh} refresh={refresh} data={data} />}
                open={openModalUpdate}
                title="Edit"
            />

            <AlertDialogUi
                handleClose={handleCloseModalDelete}
                content={<DeleteKindId handleClose={handleCloseModalDelete} setRefresh={setRefresh} refresh={refresh} data={data} />}
                open={openModalDelete}
                title="Delete"
            />*/}

            <AlertDialogUi
                handleClose={handleCloseModalAdd}
                content={<AddMovements kindmov={kindmov} refresh={refresh} setRefresh={setRefresh} handleClose={handleCloseModalAdd} />}
                open={openModalAdd}
                title="Add"
            />
        </Box>
    )
}