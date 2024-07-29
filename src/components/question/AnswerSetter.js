import { Button } from '@mui/material';
import React, { useState } from 'react';

function AnswerSetter({ questionType, questionId, onBack }) {
    const api_url = process.env.REACT_APP_API_URL;
    const [options, setOptions] = useState([{ option: '', image: null }]);
    const [freeTypeAnswer, setFreeTypeAnswer] = useState('');
    const [freeTypeImage, setFreeTypeImage] = useState(null);
    const [api_res_status, setApi_res_status] = useState(null);

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index].option = value;
        setOptions(updatedOptions);
    };

    const handleOptionImageChange = (index, image) => {
        const updatedOptions = [...options];
        updatedOptions[index].image = image;
        setOptions(updatedOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, { option: '', image: null }]);
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = [...options];
        updatedOptions.splice(index, 1);
        setOptions(updatedOptions);
    };

    const handleFreeTypeAnswerChange = (e) => {
        setFreeTypeAnswer(e.target.value);
    };

    const handleFreeTypeImageChange = (e) => {
        setFreeTypeImage(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('questionId', questionId);
        formData.append('questionType', questionType);

        if (questionType === 'mcq') {
            options.forEach((option, index) => {
                formData.append(`options[${index}][option]`, option.option);
                if (option.image) {
                    formData.append(`options[${index}][image]`, option.image);
                }
            });
        } else {
            formData.append('freeTypeAnswer', freeTypeAnswer);
            if (freeTypeImage) {
                formData.append('freeTypeImage', freeTypeImage);
            }
        }

        try {
            const response = await fetch(`${api_url}/answersetter`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('Success:', data);
            setApi_res_status(data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-xl font-bold mb-4">Set Your Answer</h1>
                {questionType === 'mcq' ? (
                    <div>
                        {options.map((option, index) => (
                            <div key={index} className="mb-4">
                                <input
                                    placeholder={`Option ${index + 1}`}
                                    value={option.option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="block w-full p-2 border border-gray-300 rounded-md mb-2"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleOptionImageChange(index, e.target.files[0])}
                                    className="block w-full p-2 border border-gray-300 rounded-md mb-2"
                                />
                                <button
                                    onClick={() => handleRemoveOption(index)}
                                    className="bg-red-500 text-white p-2 rounded-md mr-2"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={handleAddOption}
                            className="bg-blue-500 text-white p-2 rounded-md"
                        >
                            Add Option
                        </button>
                    </div>
                ) : (
                    <div className="mb-4">
                        <input
                            placeholder="Answer"
                            value={freeTypeAnswer}
                            onChange={handleFreeTypeAnswerChange}
                            className="block w-full p-2 border border-gray-300 rounded-md mb-2"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFreeTypeImageChange}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                )}
                <div className='flex justify-between'>
                    <Button
                        onClick={handleSubmit}
                        variant="contained" color="primary"
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={onBack} // Call the onBack function passed as a prop
                        variant="outlined" color="secondary"
                    >
                        Back
                    </Button>
                </div>
                <div>
                    {api_res_status}
                </div>
            </div>
        </div>
    );
}

export default AnswerSetter;