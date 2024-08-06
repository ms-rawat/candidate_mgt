import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function ShowJobRole({ onJobRolesChange }) {
    const [jobRoles, setJobRoles] = useState([]);
    const [selectedJobRoles, setSelectedJobRoles] = useState([]);

    useEffect(() => {
        const fetchJobRoles = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/jobroles`);
                const data = await response.json();
                setJobRoles(data.data);
            } catch (error) {
                console.error('Failed to fetch job roles:', error);
            }
        };

        fetchJobRoles();
    }, []);

    const handleChange = (event) => {
        const value = event.target.value;
        const selectedJobRoleIds = jobRoles
            .filter(jobRole => value.includes(jobRole.jobrole_name))
            .map(jobRole => jobRole.jobrole_id);
        setSelectedJobRoles(value);
        onJobRolesChange(selectedJobRoleIds);
        console.log(selectedJobRoleIds);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="job-role-checkbox-label">Select Job Roles</InputLabel>
                <Select
                    labelId="job-role-checkbox-label"
                    id="job-role-checkbox"
                    multiple
                    value={selectedJobRoles}
                    onChange={handleChange}
                    input={<OutlinedInput label="Select Job Roles" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {jobRoles.map((jobRole) => (
                        <MenuItem key={jobRole.id} value={jobRole.jobrole_name}>
                            <Checkbox checked={selectedJobRoles.indexOf(jobRole.jobrole_name) > -1} />
                            <ListItemText primary={jobRole.jobrole_name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
