import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AutoCompleteSkills from './AutoCompleteSkills';
import { Button, Slider } from '@mui/material';

function CompetencySkills() {
    const navigate = useNavigate('')
    const location = useLocation();
    const api_url = process.env.REACT_APP_API_URL
    const data = location.state?.currentCompetency;
    const competencyData = location.state?.competency;
    const [currentCompetency, setcurrentcompetency] = useState(data.competency_id)

    console.log(competencyData)

    const [selectedSkills, setSelectedSkills] = useState([]);
    console.log(data)
    const handleAddSkill = (skill) => {
        if (skill && !selectedSkills.some(s => s.skill_id === skill.skill_id)) {
            setSelectedSkills([...selectedSkills, { ...skill, weight: 50, competency_id: currentCompetency }]);
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
        await fetch(`${api_url}/comp_skills`, {
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
    const totalweight = selectedSkills.reduce((sum, skill) => sum + skill.weight, 0)

    useEffect(() => {
        setSelectedSkills([]);
    }, [currentCompetency]);

    const handleChangeCompetency = (competencyid) => {

        setcurrentcompetency(competencyid)
    }
    return (
        <div>

            <div className='flex justify-around mt-10 gap-4 border p-2 mx-2'>
                <div >
                    <label className='mr-2'>coompetency</label>
                    <select onChange={(e) => handleChangeCompetency(e.target.value)} value={currentCompetency} className='p-3 border-2 rounded-lg  mr-2 text-xl'>
                        {
                            competencyData.map((item, index) => (
                                <option key={index} value={item.competency_id}>{item.competency_name}</option>

                            ))
                        }

                    </select>
                </div>
                <div className='flex'>
                    <label className='mt-4 mr-2'>skills</label>
                    <AutoCompleteSkills onSkillSelect={handleAddSkill} />
                </div>
            </div>
            <div className="overflow-x-auto m-2">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Skill</th>

                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Adjust Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedSkills.map((skill, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-6 text-gray-700">{skill.skill_name}</td>

                                <td className="py-3 px-6 text-gray-700">
                                    <div>
                                        {skill.weight}%
                                    </div>
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
                    <tfoot>
                        <tr className="bg-gray-100">
                            <td className="py-3 px-6 text-gray-600 font-semibold">Total Weight</td>
                            <td className="py-3 px-6 text-gray-700">{totalweight}%</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className='flex justify-end mr-2 mt-4 '>

                <Button variant='contained' onClick={sendDatatoServer} >save</Button>


            </div>
        </div>
    );
}

export default CompetencySkills;
