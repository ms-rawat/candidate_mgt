import { Button } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
function Deletecomfirmation({ handleDelete }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <button onClick={handleOpen}><DeleteIcon /></button>
            <div className='modal-overlay'>

                <div className='modal-content'>
                    <div>
                        <h2 className='flex justify-end'><button>close</button></h2>
                    </div>
                    <div>
                        <h2>delete item</h2>
                    </div>
                    <div>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={() => { handleDelete(); handleClose() }}>yes</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Deletecomfirmation
