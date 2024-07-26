import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';

export default function AutoCompletecompetency({ oncompetencyselect }) {
    const [competency, setcompetencyData] = useState([]);
    const [currentcompetency, setcurrentcompetency] = useState([])
    const api_url = process.env.REACT_APP_API_URL
    const getcompetencyDetails = async () => {
        let result = await fetch(`${api_url}/competency`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
        result = await result.json();
        setcompetencyData(result.data);
    }

    useEffect(() => {
        getcompetencyDetails();
    }, []);

    const newArray = competency.map(competency => ({
        label: competency.competency_name,
        ...competency
    }));

    return (
        <>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={newArray}
                sx={{ width: 300 }}
                isOptionEqualToValue={(option, value) => option.competency_id === value.competency_id}
                onChange={(event, value) => setcurrentcompetency(value)}
                renderInput={(params) => <TextField {...params} label="competency" />}
            />
            <Button onClick={() => oncompetencyselect(currentcompetency)} className='h-10'> add</Button>
        </>
    );
}
