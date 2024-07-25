import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AutoCompleteSkills from './AutoCompleteSkills';
import { Slider } from '@mui/material';

function CompetencySkills() {
    const navigate = useNavigate('')
    const location = useLocation();
    const data = location.state?.competency;

    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleAddSkill = (skill) => {
        if (skill && !selectedSkills.some(s => s.skill_id === skill.skill_id)) {
            setSelectedSkills([...selectedSkills, { ...skill, weight: 50, competency_id: data.competency_id }]);
        }
    };
    console.log(selectedSkills)
    const handleWeightChange = (index, newWeight) => {
        const updatedSkills = selectedSkills.map((skill, i) =>
            i === index ? { ...skill, weight: newWeight } : skill
        );
        setSelectedSkills(updatedSkills);
    };
    const sendDatatoServer = async () => {
        await fetch('http://localhost:5000/comp_skill', {
            method: 'post',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(selectedSkills)
        }).then(res => {
            if (res.ok) {
                navigate('/competency')
            }
            else {
                console.log("error occured")
            }
        })
    }

    return (
        <div>
            <div className='text-center text-xl bold'><h1>{data.competency_name}</h1></div>
            <div className='flex justify-around'>
                <div>
                    <select className='p-2 border-1  m-2 text-xl'>
                        <option value={data.competency_name}>{data.competency_name}</option>
                    </select>
                </div>
                <div className='flex gap-2'>
                    <AutoCompleteSkills onSkillSelect={handleAddSkill} />
                </div>
            </div>
            <div className="overflow-x-auto m-2">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Skill</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Weight</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Adjust Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedSkills.map((skill, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-6 text-gray-700">{skill.skill_name}</td>
                                <td className="py-3 px-6 text-gray-700">{skill.weight}</td>
                                <td className="py-3 px-6 text-gray-700">
                                    <Slider
                                        value={skill.weight}
                                        onChange={(e, newValue) => handleWeightChange(index, newValue)}
                                        aria-label="Weight"
                                        valueLabelDisplay="auto"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center '>

                <button onClick={sendDatatoServer} className='rounded-sm bg-violet-300 px-2 text-gray-800'>save</button>

            </div>
        </div>
    );
}

export default CompetencySkills;
