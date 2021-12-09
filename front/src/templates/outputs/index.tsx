
import React from 'react';
import { useEffect, useState } from 'react';
import { AccordioUi } from "../../components/accordion";
import { OutputsRequest } from "../../services/outputsService";

export function Outputs() {
    const [rows, setrows] = useState([])

    const [expanded, setExpanded] = React.useState<string | false>(false);
    
    const handleChange =
        (panel: string, e:any) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
            console.log(e)
            console.log(expanded)
        };


    useEffect(() => {
        OutputsRequest.getAll().then(e => setrows(e))
    }, [])

    return (
        <div>
            {
                rows.map((e: any) =>
                    <AccordioUi
                        panel={e.key}
                        content={<div>{e.value}</div>}
                        tittle={e.key}
                        tittleSecond={e.value}
                        key={e.id}
                        handleChange={handleChange(e.key, e)}
                        expanded={expanded}
                    />
                )
            }
        </div>
    )
}