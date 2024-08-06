import { Button } from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
function DeleteConfirmation({ handleDelete }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <button onClick={handleOpen} className="text-bg-gray-800 border-none p-1 rounded-lg mr-2">
                <DeleteIcon />
            </button>
            {open && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <div>
                            <h2 className='flex justify-end'>
                                <button onClick={handleClose} className='border-none'><CloseIcon /></button>
                            </h2>
                        </div>
                        <div>

                            <h2 className='text-xl ml-3'>confirm deletion!</h2>
                        </div>
                        <div className='flex justify-around m-4'>
                            <Button onClick={handleClose}>No</Button>
                            <Button onClick={() => { handleDelete(); handleClose(); }}>Yes</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DeleteConfirmation;