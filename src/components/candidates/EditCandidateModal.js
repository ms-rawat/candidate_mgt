import React, { useState, useEffect } from 'react';

function EditCandidateModal({ Data, handleClose, setStatus, setRecenteditFormData }) {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        candidate_id: '',
        candidate_name: '',
        candidate_email: '',
        candidate_phone: '',
    });

    useEffect(() => {
        if (Data) {
            setFormData({
                candidate_id: Data.candidate_id,
                candidate_name: Data.candidate_name,
                candidate_email: Data.candidate_email,
                candidate_phone: Data.candidate_phon,
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
        const res = await fetch('http://127.0.0.1:5000/updatecandidate', {
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
                <h2 className='text-center text-xl mb-2'> Edit Candidate </h2>
                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div>
                        <label>id:</label>
                        <input
                            type='text'
                            name='candidate_id'
                            placeholder='candidate id'
                            onChange={handleChange}
                            value={formData.candidate_id}
                        />
                    </div>
                    <div>
                        <label>name:</label>
                        <input
                            type='text'
                            name='candidate_name'
                            placeholder='candidate name'
                            onChange={handleChange}
                            value={formData.candidate_name}
                        />
                    </div>
                    <div>
                        <label>email:</label>
                        <input
                            type='email'
                            name='candidate_email'
                            placeholder='candidate email'
                            onChange={handleChange}
                            value={formData.candidate_email}
                        />
                    </div>
                    <div>
                        <label>phone no:</label>
                        <input
                            type='text'
                            name='candidate_phone'
                            placeholder='candidate phone number'
                            onChange={handleChange}
                            value={formData.candidate_phone}
                        />
                    </div>
                    <div className='text-yellow-300'>{message}</div>
                    <button type='submit'>Update Candidate</button>
                </form>
            </div>
        </div>
    );
}

export default EditCandidateModal;
