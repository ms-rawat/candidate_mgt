import React, { useState } from 'react'
import './App.css'

function AddCandidateModal({ handleclose, setStatus, setRecentformData }) {
    const [message, setmessage] = useState('')
    const [formData, setFormData] = useState({

        competency_id: '',
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
        const res = await fetch('http://127.0.0.1:5000/addcompetency', {
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
                <div className='flex justify-end'><button onClick={handleclose}>close</button></div>
                <h2 className='text-center text-xl mb-2'> Add Competency </h2>
                <form className=' flex flex-col gap-2' onSubmit={handlesubmit}>
                    <div><label>id:</label> <input type='text' name='competency_id' placeholder='competency id' onChange={handleChange} value={formData.competency_id} /></div>

                    <div><label>name:</label> <input type='text' name='competency_name' placeholder='competency name' onChange={handleChange} value={formData.competency_name} /></div>
                    <div><label>desc:</label> <input type='text' name='competency_description' placeholder='competency description' onChange={handleChange} value={formData.competency_desc} /></div>
                    <div className='text-yellow-300'>{message}</div>
                    <button type='submit'>Add competency</button>
                </form>
            </div >
        </div >
    )
}

export default AddCandidateModal
