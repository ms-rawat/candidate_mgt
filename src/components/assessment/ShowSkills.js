import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { Divider, IconButton, ListItemText } from '@mui/material';
import { Delete } from '@mui/icons-material';

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

export default function ShowSkills({ onSkillsChange }) {
    const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([{ id: '', name: '', weight: 50 }]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/skills`);
                const data = await response.json();
                setSkills(data.data);
            } catch (error) {
                console.error('Failed to fetch skills:', error);
            }
        };

        fetchSkills();
    }, []);

    const handleSkillChange = (index, event) => {
        const value = event.target.value;
        const updatedSkills = [...selectedSkills];
        updatedSkills[index].id = skills.find(skill => skill.skill_name === value)?.skill_id || '';
        updatedSkills[index].name = value;
        setSelectedSkills(updatedSkills);
        onSkillsChange(updatedSkills);
    };

    const handleWeightChange = (index, value) => {
        const updatedSkills = [...selectedSkills];
        updatedSkills[index].weight = value;
        setSelectedSkills(updatedSkills);
        onSkillsChange(updatedSkills);
    };

    const addSkillRow = () => {
        setSelectedSkills([...selectedSkills, { id: '', name: '', weight: 50 }]);
    };

    const removeSkillRow = (index) => {
        const updatedSkills = [...selectedSkills];
        updatedSkills.splice(index, 1);
        setSelectedSkills(updatedSkills);
        onSkillsChange(updatedSkills);
    };

    const getAvailableSkills = (currentIndex) => {
        const selectedNames = selectedSkills.map(skill => skill.name);
        return skills.filter(skill => !selectedNames.includes(skill.skill_name) || skill.skill_name === selectedSkills[currentIndex].name);
    };

    return (
        <div>
            {selectedSkills.map((skill, index) => (
                <div key={index} className="mb-4">
                    <div className="flex justify-between border rounded-lg px-4 pt-2">
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id={`skill-checkbox-label-${index}`}>Select Skill</InputLabel>
                            <Select
                                labelId={`skill-checkbox-label-${index}`}
                                id={`skill-checkbox-${index}`}
                                value={skill.name || ''}
                                onChange={(e) => handleSkillChange(index, e)}
                                input={<OutlinedInput label="Select Skill" />}
                                MenuProps={MenuProps}
                            >
                                {getAvailableSkills(index).map((skill) => (
                                    <MenuItem key={skill.skill_id} value={skill.skill_name}>
                                        <ListItemText primary={skill.skill_name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className="mx-3 w-2/3 mt-4">
                            <Slider
                                value={skill.weight}
                                onChange={(e, value) => handleWeightChange(index, value)}
                                aria-labelledby="input-slider"
                                min={0}
                                max={100}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <Divider orientation="vertical" variant="middle" mx-2 flexItem />

                        <div className="flex items-center mt-2">
                            <IconButton onClick={() => removeSkillRow(index)} aria-label="delete">
                                <Delete />
                            </IconButton>
                        </div>
                    </div>
                </div>
            ))}
            <Button variant="contained" onClick={addSkillRow}>Add Skill</Button>
        </div>
    );
}
