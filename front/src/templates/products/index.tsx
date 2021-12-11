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

import { ProductsRequest } from '../../services/productService';
import { UnitsRequest } from "../../services/unitService";


import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


import { AddProduct } from "./add";
import { UpdateProduct } from "./update";
import { DeleteProduct } from "./delete";


import Fab from '@mui/material/Fab';
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';


import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';

import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer';


function Row(props: { row: ReturnType<any>, setRefresh: any, refresh: any }) {
    const { row, setRefresh, refresh } = props;
    const [open, setOpen] = React.useState(false);
    const [openModalUpdate, setOpenModalUpdate] = React.useState(false);
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [derivates, setDerivates] = React.useState([])

    const [data, setdata] = React.useState({});


    const [units, setunits] = React.useState([]);

    useEffect(() => {
        UnitsRequest.getUnits()
            .then(e => setunits(e))
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


    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => { setOpen(!open); ProductsRequest.getProductChild(row.id).then(e => setDerivates(e)) }}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">{row.unit_purchase.name}</TableCell>
                <TableCell align="left">{row.unit_sale.name}</TableCell>
                <TableCell align="left">{row.current_existence}</TableCell>
                <TableCell align="left">{row.reserved_quantity}</TableCell>
                <TableCell align="left">
                    <Stack direction="row" alignItems="center">
                        <IconButton aria-label="update" onClick={() => handleClickOpenModalUpdate(row)}><EditIcon fontSize="small" color="primary" /></IconButton>
                        <IconButton aria-label="delete" onClick={() => handleClickOpenModalDelete(row)} ><DeleteIcon fontSize="small" sx={{ color: red[700] }} /></IconButton>
                    </Stack>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box
                            sx={{ margin: 1 }}
                        >

                            <TableNormalUi
                                ariaLabel="purchases"
                                tableHead={
                                    <TableRow >

                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Id</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Descripción</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Und.Compra</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Und.Venta</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Existencia</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Reservados </TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Acción</TableCell>
                                    </TableRow>
                                }
                                tableBody={
                                    derivates.map((e: any, i: any) =>
                                        <TableRow
                                            key={e.id}
                                        >

                                            <TableCell component="th" scope="row">{e.id}</TableCell>
                                            <TableCell align="left">{e.name}</TableCell>
                                            <TableCell align="left">{e.description}</TableCell>
                                            <TableCell align="left">{e.unit_purchase.name}</TableCell>
                                            <TableCell align="left">{e.unit_sale.name}</TableCell>
                                            <TableCell align="left">{e.current_existence}</TableCell>
                                            <TableCell align="left">{e.reserved_quantity}</TableCell>
                                            <TableCell align="left">
                                                <Stack direction="row" alignItems="center">
                                                    <IconButton aria-label="update" onClick={() => handleClickOpenModalUpdate(e)}><EditIcon fontSize="small" color="primary" /></IconButton>
                                                    <IconButton aria-label="delete" onClick={() => handleClickOpenModalDelete(e)} ><DeleteIcon fontSize="small" sx={{ color: red[700] }} /></IconButton>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            />



                        </Box>
                    </Collapse>
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


                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export function Products() {

    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const [rows, setrows] = React.useState([]);

    const [refresh, setRefresh] = React.useState(false)

    const [units, setunits] = React.useState([]);

    useEffect(() => {
        UnitsRequest.getUnits()
            .then(e => setunits(e))
    }, [])

    useEffect(() => {
        ProductsRequest.getProductDerivatesAndNot(false)
            .then(e => setrows(e))
    }, [refresh])


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
                    <TableContainer component={Paper}>
                        <TableNormalUi
                            tableHead={
                                <TableRow >
                                    <TableCell />
                                    <TableCell align="left" style={{ fontWeight: 'bold' }}>Id</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bold' }}>Descripción</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bold' }}>Und.Compra</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bold' }}>Und.Venta</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bold' }}>Existencia</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bold' }}>Reservados </TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bold' }}>Acción</TableCell>
                                </TableRow>
                            }
                            tableBody={
                                rows.map((data: any, i: any) =>
                                    <Row row={data} key={i} setRefresh={setRefresh} refresh={refresh} />
                                )
                            }
                        />

                    </TableContainer>


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
            }} size="small" color="primary" onClick={handleClickOpenModalAdd} aria-label="add">
                <AddIcon />
            </Fab>
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


/*

<TableNormalUi
                        tableHead={
                            <TableRow >

                                <TableCell align="left" style={{ fontWeight : 'bold' }}>Id</TableCell>
                                <TableCell align="left" style={{ fontWeight : 'bold' }}>Nombre</TableCell>
                                <TableCell align="left" style={{ fontWeight : 'bold' }}>Descripción</TableCell>
                                <TableCell align="left" style={{ fontWeight : 'bold' }}>Und.Compra</TableCell>
                                <TableCell align="left" style={{ fontWeight : 'bold' }}>Und.Venta</TableCell>
                                <TableCell align="left" style={{ fontWeight : 'bold' }}>Existencia</TableCell>
                                <TableCell align="left" style={{ fontWeight : 'bold' }}>Reservados </TableCell>
                                <TableCell align="left" style={{ fontWeight : 'bold' }}>Acción</TableCell>
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
                                        <Stack direction="row" alignItems="center">
                                            <IconButton aria-label="update" onClick={() => handleClickOpenModalUpdate(data)}><EditIcon fontSize="small" color="primary" /></IconButton>
                                            <IconButton aria-label="delete" onClick={() => handleClickOpenModalDelete(data)} ><DeleteIcon fontSize="small" sx={{ color: red[700] }} /></IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    />


*/