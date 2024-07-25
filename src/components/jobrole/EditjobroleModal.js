import React, { useState, useEffect } from 'react';

function EditSkillModal({ Data, handleClose, setStatus, setRecenteditFormData }) {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        jobrole_id: '',
        jobrole_name: '',
        jobrole_description: '',

    });

    useEffect(() => {
        if (Data) {
            setFormData({
                jobrole_id: Data.jobrole_id,
                jobrole_name: Data.jobrole_name,
                jobrole_description: Data.jobrole_description,

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
        const res = await fetch('http://127.0.0.1:5000/updatejobrole', {
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
                <div className='flex justify-end'><button onClick={handleClose}>close</button></div>
                <h2 className='text-center text-xl mb-2'> Edit jobrole </h2>
                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div>
                        <label>id:</label>
                        <input
                            type='text'
                            name='jobrole_id'
                            placeholder='jobrole id'
                            onChange={handleChange}
                            value={formData.jobrole_id}
                        />
                    </div>
                    <div>
                        <label>name:</label>
                        <input
                            type='text'
                            name='jobrole_name'
                            placeholder='jobrole name'
                            onChange={handleChange}
                            value={formData.jobrole_name}
                        />
                    </div>
                    <div>
                        <label>desc:</label>
                        <input
                            type='text'
                            name='jobrole_description'
                            placeholder='jobrole desc'
                            onChange={handleChange}
                            value={formData.jobrole_description}
                        />
                    </div>

                    <div className='text-yellow-300'>{message}</div>
                    <button type='submit'>Update skill</button>
                </form>
            </div>
        </div>
    );
}

export default EditSkillModal;
