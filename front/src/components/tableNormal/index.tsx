import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
//import Paper from '@mui/material/Paper';


import { tableNormalProps } from "../../types/tableNormalType";

export function TableNormalUi({ papper, tableHead, tableBody, size="medium", minWidth = 650, ariaLabel="collapsible table" } : tableNormalProps)
{
    return (
        <TableContainer component={papper}>
            <Table size={size} sx={{ minWidth: minWidth }} aria-label={ariaLabel}>
            <TableHead>
                
                    {
                        tableHead
                    }
                    {/* <TableRow>  <TableCell align="right">Description</TableCell> </TableRow> */}
                
            </TableHead>
            <TableBody>

                {
                    tableBody
                }

                {/* 
                   Product.map((data: any) => (
                        <TableRow
                            key={data.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {data.id}
                            </TableCell>
                            <TableCell align="right">{data.name}</TableCell>
                            <TableCell align="right">{data.price}</TableCell>
                            <TableCell align="right">{data.descriptions}</TableCell>
                        </TableRow>

                    ))
                 */}
            </TableBody>
            </Table>
        </TableContainer>
    )
}