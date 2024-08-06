import React from 'react';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

function ImageUpload({ images, onRemove }) {
    return (
        <div className="flex flex-wrap gap-4">
            {images.map((image, index) => (
                <div key={index} className="relative">
                    <img src={URL.createObjectURL(image)} alt={`uploaded ${index}`} className="w-32 h-32 object-cover rounded-md" />
                    <IconButton
                        onClick={() => onRemove(index)}
                        className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1"
                    >
                        <Close />
                    </IconButton>
                </div>
            ))}
        </div>
    );
}

export default ImageUpload;
