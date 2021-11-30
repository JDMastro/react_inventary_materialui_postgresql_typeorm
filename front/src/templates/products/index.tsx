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

import { ProductsRequest } from "../../services/productService";
import { UnitsRequest } from "../../services/unitService";


import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


import { AddProduct } from "./add";
import { UpdateProduct } from "./update";
import { DeleteProduct } from "./delete";


import Fab from '@mui/material/Fab';
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';

export function Products() {

    const [openModalUpdate, setOpenModalUpdate] = React.useState(false);
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const [rows, setrows] = React.useState([]);
    const [units, setunits] = React.useState([]);
    const [data, setdata] = React.useState({});

    const [refresh, setRefresh] = React.useState(false)

    useEffect(() => {
        UnitsRequest.getUnits()
            .then(e => setunits(e))
    }, [])

    useEffect(() => {
        ProductsRequest.getproducts()
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
                        <Typography>Productos</Typography>
                        {/*<IconButton onClick={handleClickOpenModalAdd} aria-label="add" ><AddIcon fontSize="small" /></IconButton>*/}

                    </Stack>
                    <TableNormalUi
                        tableHead={
                            <TableRow >

                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">Nombre</TableCell>
                                <TableCell align="left">Descripción</TableCell>
                                <TableCell align="left">Und. Compra</TableCell>
                                <TableCell align="left">Und. Venta</TableCell>
                                <TableCell align="left">Existencia</TableCell>
                                <TableCell align="left">Cantidad Reservada </TableCell>
                                <TableCell align="left">Acción</TableCell>
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
                                    <TableCell align="left">{data.unit_purchase.name}</TableCell>
                                    <TableCell align="left">{data.unit_sale.name}</TableCell>
                                    <TableCell align="left">{data.current_existence}</TableCell>
                                    <TableCell align="left">{data.reserved_quantity}</TableCell>
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
                content={<UpdateProduct handleClose={handleCloseModalUpdate} units={units} setRefresh={setRefresh} refresh={refresh} data={data} />}
                open={openModalUpdate}
                title=""
            />

            <AlertDialogUi
                handleClose={handleCloseModalDelete}
                content={<DeleteProduct handleClose={handleCloseModalDelete} setRefresh={setRefresh} refresh={refresh} data={data} />}
                open={openModalDelete}
                title=""
            />

            <AlertDialogUi
                handleClose={handleCloseModalAdd}
                content={<AddProduct products={rows} refresh={refresh} setRefresh={setRefresh} units={units} handleClose={handleCloseModalAdd} />}
                open={openModalAdd}
                title=""
            />
        </Box>
    )
}

//<TableUi columns={columns} rows={rows} />