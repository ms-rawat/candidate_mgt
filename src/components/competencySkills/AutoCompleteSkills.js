import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutoCompleteSkills({ onSkillSelect }) {
    const [skills, setSkillsData] = useState([]);

    const getSkillDetails = async () => {
        let result = await fetch('http://127.0.0.1:5000/skills', {
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
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={newArray}
            sx={{ width: 300 }}
            isOptionEqualToValue={(option, value) => option.skill_id === value.skill_id}
            onChange={(event, value) => onSkillSelect(value)}
            renderInput={(params) => <TextField {...params} label="skills" />}
        />
    );
}
