import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';

export default function AutoCompleteSkills({ onSkillSelect }) {
    const [skills, setSkillsData] = useState([]);
    const [currentskill, setcurrentskill] = useState([])
    const api_url = process.env.REACT_APP_API_URL
    const getSkillDetails = async () => {
        let result = await fetch(`${api_url}/skills`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
        result = await result.json();
        setSkillsData(result.data);
    }

    useEffect(() => {
        getSkillDetails();
    }, []);

    const newArray = skills.map(skill => ({
        label: skill.skill_name,
        ...skill
    }));

    return (
        <div className='flex  gap-2'>


            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={newArray}
                sx={{ width: 300 }}
                isOptionEqualToValue={(option, value) => option.skill_id === value.skill_id}
                onChange={(event, value) => setcurrentskill(value)}
                renderInput={(params) => <TextField {...params} label="skills" />}
            />
            <Button className='h-3/4 ' variant='contained' onClick={() => onSkillSelect(currentskill)} > add</Button>
        </div>
    );
}
