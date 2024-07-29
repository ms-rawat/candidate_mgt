import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
function EditcompetencyModal({ Data, handleClose, setStatus, setRecenteditFormData }) {
    const [message, setMessage] = useState('');
    const api_url = process.env.REACT_APP_API_URL
    const [formData, setFormData] = useState({
        competency_id: '',
        competency_name: '',
        competency_description: '',

    });

    useEffect(() => {
        if (Data) {
            setFormData({
                competency_id: Data.competency_id,
                competency_name: Data.competency_name,
                competency_description: Data.competency_description,

            });
        }
    }, [Data]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        sendDataToServer(formData);
    };

    const sendDataToServer = async (formData) => {
        const res = await fetch(`${api_url}/competencies/update`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await res.json();
        console.log(result);
        setMessage(result.message);
        if (res.ok) {
            console.log("data updated");
            setStatus(true);
            setRecenteditFormData(formData);
            handleClose();
        } else {
            console.log("error while updating");
        }
    };

    console.log(message);

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <div className='flex justify-end'><button onClick={handleClose}><CloseIcon /></button></div>
                <h2 className='text-center text-xl mb-2'> Edit Candidate </h2>
                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>

                    <div className='flex flex-col'>
                        <label>name:</label>
                        <input
                            type='text'
                            name='competency_name'
                            placeholder='competency name'
                            onChange={handleChange}
                            value={formData.competency_name}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label>desc:</label>
                        <input
                            type='text'
                            name='competency_description'
                            placeholder='competency desc'
                            onChange={handleChange}
                            value={formData.competency_description}
                        />
                    </div>

                    <div className='text-yellow-300'>{message}</div>
                    <button type='submit'>Update competency</button>
                </form>
            </div>
        </div>
    );
}

export default EditcompetencyModal;
