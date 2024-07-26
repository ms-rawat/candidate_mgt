import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AutoCompletecompetency from './AutoCompletecompetency';
import { Button, Slider } from '@mui/material';

function Jobrolecompetency() {
    const navigate = useNavigate('')
    const location = useLocation();
    const api_url = process.env.REACT_APP_API_URL
    const data = location.state?.currentjobrole;
    const jobroleData = location.state?.jobrole;
    const [currentjobrole, setcurrentjobrole] = useState(data.jobrole_id)

    console.log(jobroleData)

    const [selectedcompetency, setSelectedcompetency] = useState([]);
    console.log(data)
    const handleAddcompetency = (competency) => {
        if (competency && !selectedcompetency.some(s => s.competency_id === competency.competency_id)) {
            setSelectedcompetency([...selectedcompetency, { ...competency, weight: 50, jobrole_id: currentjobrole }]);
        }
    };
    console.log(selectedcompetency)
    const handleWeightChange = (index, newWeight) => {
        const updatedcompetency = selectedcompetency.map((competency, i) =>
            i === index ? { ...competency, weight: newWeight } : competency
        );
        setSelectedcompetency(updatedcompetency);
    };
    const sendDatatoServer = async () => {
        await fetch(`${api_url}/jobrole_competency`, {
            method: 'post',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(selectedcompetency)
        }).then(res => {
            if (res.ok) {
                navigate('/jobrole')
            }
            else {
                console.log("error occured")
            }
        })
    }
    const totalweight = selectedcompetency.reduce((sum, competency) => sum + competency.weight, 0)

    useEffect(() => {
        setSelectedcompetency([]);
    }, [currentjobrole]);

    const handleChangejobrole = (jobroleid) => {

        setcurrentjobrole(jobroleid)
    }
    return (
        <div>
            <div className='text-center text-xl bold'><h1>{data.jobrole_name}</h1></div>
            <div className='flex justify-around'>
                <div>
                    <select onChange={(e) => handleChangejobrole(e.target.value)} value={currentjobrole} className='p-3 border-2 rounded-lg  m-2 text-xl'>
                        {
                            jobroleData.map((item, index) => (
                                <option key={index} value={item.jobrole_id}>{item.jobrole_name}</option>

                            ))
                        }

                    </select>
                </div>
                <div className='flex gap-2'>
                    <AutoCompletecompetency oncompetencyselect={handleAddcompetency} />
                </div>
            </div>
            <div className="overflow-x-auto m-2">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">competency</th>

                            <th className="py-3 px-6 text-left text-gray-600 font-semibold">Adjust Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedcompetency.map((competency, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-6 text-gray-700">{competency.competency_name}</td>

                                <td className="py-3 px-6 text-gray-700">
                                    <div>
                                        {competency.weight}%
                                    </div>
                                    <Slider
                                        value={competency.weight}
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

export default Jobrolecompetency;
