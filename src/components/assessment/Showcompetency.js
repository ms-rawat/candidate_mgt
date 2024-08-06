import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { Divider, ListItemText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

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

export default function ShowCompetency({ onCompetenciesChange }) {
    const [competencies, setCompetencies] = useState([]);
    const [selectedCompetencies, setSelectedCompetencies] = useState([{ id: '', name: '', weight: 50 }]);

    useEffect(() => {
        const fetchCompetencies = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/competencies/competency`);
                const data = await response.json();
                setCompetencies(data.data);
            } catch (error) {
                console.error('Failed to fetch competencies:', error);
            }
        };

        fetchCompetencies();
    }, []);

    const handleCompetencyChange = (index, event) => {
        const value = event.target.value;
        const updatedCompetencies = [...selectedCompetencies];
        updatedCompetencies[index].id = competencies.find(comp => comp.competency_name === value)?.competency_id || '';
        updatedCompetencies[index].name = value;
        setSelectedCompetencies(updatedCompetencies);
        onCompetenciesChange(updatedCompetencies);
    };

    const handleWeightChange = (index, value) => {
        const updatedCompetencies = [...selectedCompetencies];
        updatedCompetencies[index].weight = value;
        setSelectedCompetencies(updatedCompetencies);
        onCompetenciesChange(updatedCompetencies);
    };

    const addCompetencyRow = () => {
        setSelectedCompetencies([...selectedCompetencies, { id: '', name: '', weight: 50 }]);
    };

    const removeCompetencyRow = (index) => {
        const updatedCompetencies = [...selectedCompetencies];
        updatedCompetencies.splice(index, 1);
        setSelectedCompetencies(updatedCompetencies);
        onCompetenciesChange(updatedCompetencies);
    };

    const getAvailableCompetencies = (currentIndex) => {
        const selectedNames = selectedCompetencies.map(comp => comp.name);
        return competencies.filter(comp => !selectedNames.includes(comp.competency_name) || comp.competency_name === selectedCompetencies[currentIndex].name);
    };
    console.log(selectedCompetencies)

    return (
        <div>
            {selectedCompetencies.map((comp, index) => (
                <div key={index} className="mb-4 flex justify-between border rounded-lg px-4 pt-2 gap-1">
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id={`competency-checkbox-label-${index}`}>Select Competency</InputLabel>
                        <Select
                            labelId={`competency-checkbox-label-${index}`}
                            id={`competency-checkbox-${index}`}
                            value={comp.name || ''}
                            onChange={(e) => handleCompetencyChange(index, e)}
                            input={<OutlinedInput label="Select Competency" />}
                            MenuProps={MenuProps}
                        >
                            {getAvailableCompetencies(index).map((competency) => (
                                <MenuItem key={competency.competency_id} value={competency.competency_name}>
                                    <ListItemText primary={competency.competency_name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className="mx-2 w-2/3 mt-5">
                        <Slider
                            value={comp.weight}
                            onChange={(e, value) => handleWeightChange(index, value)}
                            aria-labelledby="input-slider"
                            min={0}
                            max={100}
                            valueLabelDisplay="auto"
                        />
                    </div>
                    <Divider orientation="vertical" variant="middle" mx-2 flexItem />

                    <div className="flex items-center mt-3">
                        <IconButton onClick={() => removeCompetencyRow(index)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
            ))}
            <Button variant="contained" onClick={addCompetencyRow}>Add Competency</Button>
        </div>
    );
}
