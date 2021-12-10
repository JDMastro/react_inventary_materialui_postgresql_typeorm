
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { TableNormalUi } from "../../components/tableNormal";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


import { MovementsRequest } from "../../services/MovementsService";



export function AddTable({ movements, findNumberOrder, number_order }: any) {
    return (
        <Box style={{ marginTop: "5px" }}>
            <TableNormalUi
                tableHead={
                    <TableRow >
                        <TableCell align="center" style={{ fontWeight : 'bold' }}>Id</TableCell>
                        {/*<TableCell align="center" style={{ fontWeight : 'bold' }}>Tipo de Movimiento</TableCell>*/}
                        <TableCell align="center" style={{ fontWeight : 'bold' }}>Producto</TableCell>
                        <TableCell align="center" style={{ fontWeight : 'bold' }}>Cantidad</TableCell>
                        <TableCell align="center" style={{ fontWeight : 'bold' }}>Precio Total</TableCell>
                        <TableCell align="center" style={{ fontWeight : 'bold' }}>Precio unitario</TableCell>
                        <TableCell align="center" style={{ fontWeight : 'bold' }}>Acción</TableCell>
                    </TableRow>
                }
                tableBody={
                    movements.map((e: any, i: any) =>
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{e.id}</TableCell>
                            {/*<TableCell align="center">{e.Header.KindMovements.name}</TableCell>*/}
                            <TableCell align="center">{e.Products.name}</TableCell>
                            <TableCell align="center">{e.quantity}</TableCell>
                            <TableCell align="center">{e.totalPurchasePrice}</TableCell>
                            <TableCell align="center">{
                                e.unitPrice
                            }</TableCell>
                            <TableCell align="center"><IconButton aria-label="delete" onClick={
                                () => {
                                    MovementsRequest.delete(e.id).then(res => findNumberOrder(number_order)  ); 
                                  
                                }
                            }  ><DeleteIcon fontSize="small" /></IconButton></TableCell>
                        </TableRow>
                    )

                }
            />
        </Box>
    )
}