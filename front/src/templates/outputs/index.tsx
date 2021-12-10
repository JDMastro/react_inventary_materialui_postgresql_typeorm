
import { Box, Grid, TableRow, TableCell } from '@mui/material';
import { UseForm } from "../../components/form";
import { SelectWrapperUi } from "../../components/select";
import { ButtonUi } from "../../components/button/index";
import { personRequest } from "../../services/personService";
import { StatusRequest } from "../../services/statusService";
import { initialValuesOutputsFilter } from "../../initialValues";
import { initialFValuesTypes } from "../../types/initialFValues";
import { ouputsSchema } from "../../schema/outputsSchema";
import { AccordioUi } from "../../components/accordion";
import { TableNormalUi } from "../../components/tableNormal";

import MenuItem from '@mui/material/MenuItem';
import { FormikHelpers } from "formik";
import { useEffect, useState } from 'react';
import Search from '@mui/icons-material/Search';

export function Outputs() {

    const [persons, setPersons] = useState([])
    const [status, setStatus] = useState([])
    const [disablebtns, setDisablebtns] = useState(false)
    const [number_orders, setNumber_orders] = useState([])
    const [orders, setOrders] = useState([])

    const [expanded, setExpanded] = useState<string | false>(false);



    useEffect(() => {
        personRequest.getAll().then(e => setPersons(e))
        StatusRequest.getStatus().then(e => setStatus(e))

    }, [])

    const onSubmit = async (values: initialFValuesTypes, formikHelpers: FormikHelpers<any>) => {
        setDisablebtns(true)

        StatusRequest.getAllNumberOrdersbyStatus(values.status_id, values.person_id)
            .then(e => setNumber_orders(e))

        setDisablebtns(false)
        console.log(values)
    }

    const formik = UseForm(initialValuesOutputsFilter, ouputsSchema, onSubmit)

    const handleChangeAccordion =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
            StatusRequest.getAllnumberOrders(parseInt(panel)).then(e => setOrders(e) )
        };

    return (
        <div>
            {/* <SelectWrapperUi
                name={SelectData}
                label='Estados'
                value={SelectData}
                onChange={handleChange}
                error={false}
                menuItems={status.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name} ${data.description}`}</MenuItem>)}

            />*/}
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <SelectWrapperUi
                            name="status_id"
                            label='Estados'
                            value={formik.values.status_id}
                            onChange={formik.handleChange}
                            error={formik.errors.status_id}
                            menuItems={status.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name} ${data.code}`}</MenuItem>)}

                        />                    </Grid>
                    <Grid item xs={5}>
                        <SelectWrapperUi
                            name="person_id"
                            label='Personas'
                            value={formik.values.person_id}
                            onChange={formik.handleChange}
                            error={formik.errors.person_id}
                            menuItems={persons.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.fullname}`}</MenuItem>)}

                        />
                    </Grid>
                    <Grid item xs={2}>
                        <ButtonUi variant="contained" disabled={disablebtns} text="Buscar" type="submit" Icon={<Search fontSize="small" />} />
                    </Grid>

                </Grid>

            </Box>
            <Box mt={2}>
                {
                    number_orders.map((e: any) =>
                        <AccordioUi
                            tittle={e.h_number_order}
                            tittleSecond={e.ps_fullname}
                            panel={e.h_number_order}
                            content={
                                <TableNormalUi
                                    tableHead={
                                        <TableRow >

                                            <TableCell align="left" style={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                            <TableCell align="left" style={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                                            <TableCell align="left" style={{ fontWeight: 'bold' }}>Fecha de Creación</TableCell>
                                        </TableRow>
                                    }
                                    tableBody={
                                       orders.map((e:any, i:any)=>
                                       <TableRow
                                       key={i}
                                       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                   >
                                       <TableCell align="left">{e.p_name}</TableCell>
                                       {/*<TableCell align="left">{e.Header.KindMovements.name}</TableCell>*/}
                                       <TableCell align="left">{e.m_quantity}</TableCell>
                                       <TableCell align="left">{e.creation_at}</TableCell>
                                      
                                   </TableRow>
                                       )
                                    }
                                />
                            }
                            handleChange={handleChangeAccordion(e.h_number_order)}
                            expanded={expanded}
                        />
                    )
                }

            </Box>
        </div>
    )
}

/*

<TableNormalUi
                    tableHead={
                        <TableRow >

                            <TableCell align="left" style={{ fontWeight: 'bold' }}>Num Order</TableCell>
                            <TableCell align="left" style={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                            <TableCell align="left" style={{ fontWeight: 'bold' }}>Nombre completo</TableCell>
                            <TableCell align="left" style={{ fontWeight: 'bold' }}>Fecha de Creación</TableCell>
                        </TableRow>
                    }
                    tableBody={
                        <div></div>
                    }
                />


                  <AccordioUi
                    tittle={'dasdas'}
                    tittleSecond={'sdfsdf'}
                    panel={"dasdas"}
                    content={<div>fdsfds</div>}
                    handleChange={handleChangeAccordion("dasdas")}
                    expanded={expanded}
                />

*/