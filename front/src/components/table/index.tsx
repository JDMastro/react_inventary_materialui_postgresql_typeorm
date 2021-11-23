import { DataGrid } from '@mui/x-data-grid';
import { tableProps } from "../../types/tableType";


export function TableUi({ columns, rows }: tableProps) {
    return (
        <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]} />
    );
}
