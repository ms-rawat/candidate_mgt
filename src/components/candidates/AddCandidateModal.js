import React, { useState } from 'react'
import './App.css'
import CloseIcon from '@mui/icons-material/Close';
function AddCandidateModal({ handleclose, setStatus, setRecentformData }) {
    const [message, setmessage] = useState('')


    const api_url = process.env.REACT_APP_API_URL

    const [formData, setFormData] = useState({


        candidate_name: '',
        candidate_email: '',
        candidate_phon: '',

    })
    console.log(formData)
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        sendDataToserver(formData)

    }

    const sendDataToserver = async (formData) => {
        const res = await fetch(`${api_url}/candidates/addcandidate`, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await res.json();
        console.log(result)
        setmessage(result.message)
        if (res.ok) {
            console.log("data inserted")
            setStatus(true)
            setRecentformData(formData)

        }
        else {
            console.log("error while insertion")

        }


    }
    console.log(message)



    return (
        <div className='modal-overlay'>
            <div className='modal-content '>
                <div className='flex justify-end'><button onClick={handleclose}><CloseIcon /></button></div>
                <h2 className='text-center text-xl mb-2'> Add Candidate </h2>
                <form className=' flex flex-col gap-2' onSubmit={handlesubmit}>

                    <div className='flex flex-col'><label>name:</label> <input type='text' name='candidate_name' placeholder='candidate name' onChange={handleChange} value={formData.candidate_name} /></div>
                    <div className='flex flex-col'><label>email:</label> <input type='email' name='candidate_email' placeholder='candidate email' onChange={handleChange} value={formData.candidate_email} /></div>
                    <div className='flex flex-col'><label>phone no:</label> <input type='text' name='candidate_phon' placeholder='candidate phone number' onChange={handleChange} value={formData.candidate_phone} /></div>
                    <div className='text-yellow-300'>{message}</div>
                    <button type='submit'>Add Candidate</button>
                </form>
            </div >
        </div >
    )
}

export default AddCandidateModal
