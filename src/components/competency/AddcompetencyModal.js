import React, { useState } from 'react'
import './App.css'
import CloseIcon from '@mui/icons-material/Close';
function AddCandidateModal({ handleclose, setStatus, setRecentformData }) {
    const [message, setmessage] = useState('')
    const api_url = process.env.REACT_APP_API_URL
    const [formData, setFormData] = useState({


        competency_name: '',
        competency_description: '',


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
        const res = await fetch(`${api_url}/addcompetency`, {
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
                <h2 className='text-center text-xl mb-2'> Add Competency </h2>
                <form className=' flex flex-col gap-2' onSubmit={handlesubmit}>

                    <div className='flex flex-col'><label>name:</label> <input type='text' name='competency_name' placeholder='competency name' onChange={handleChange} value={formData.competency_name} /></div>
                    <div className='flex flex-col'><label>desc:</label> <input type='text' name='competency_description' placeholder='competency description' onChange={handleChange} value={formData.competency_desc} /></div>
                    <div className='text-yellow-300'>{message}</div>
                    <button type='submit'>Add competency</button>
                </form>
            </div >
        </div >
    )
}

export default AddCandidateModal
