import { Button } from '@mui/material';
import React, { useState } from 'react';
import { AddCircleOutline, AttachFile, Close, Remove, RemoveCircleOutline } from '@mui/icons-material';
import ImageUpload from '../reusableComp/ImageUpload'; // Import the ImageUpload component
import SkillsDropdown from './SkillsDropdown';

function Questionsetter() {
    const api_url = process.env.REACT_APP_API_URL;
    const [skill, setSkill] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [question, setQuestion] = useState('');
    const [questionImages, setQuestionImages] = useState([]);
    const [difficulty, setDifficulty] = useState('');
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([{ option: '', image: null, isCorrect: false }]);
    const [freeTypeAnswer, setFreeTypeAnswer] = useState('');
    const [freeTypeImage, setFreeTypeImage] = useState(null);
    const [api_res_status, setApi_res_status] = useState(null);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + questionImages.length > 10) {
            alert('You can only upload a maximum of 10 images.');
            return;
        }
        setQuestionImages([...questionImages, ...files]);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = questionImages.filter((_, i) => i !== index);
        setQuestionImages(updatedImages);
    };

    const handleOptionImageChange = (index, image) => {
        const updatedOptions = [...options];
        updatedOptions[index].image = image;
        setOptions(updatedOptions);
    };

    const handleCorrectOptionChange = (index) => {
        const updatedOptions = [...options];
        if (questionType === 'mcq-single') {
            updatedOptions.forEach((option, i) => {
                option.isCorrect = i === index;
            });
        } else {
            updatedOptions[index].isCorrect = !updatedOptions[index].isCorrect;
        }
        setOptions(updatedOptions);
    };

    const handleSubmit = async () => {
        console.log("clicked")
        if (!skill || !questionType || !question || !difficulty) {
            setApi_res_status('Please fill in all required fields.');
            return;
        }

        if (questionType.includes('mcq')) {
            if (options.some((option) => !option.option)) {
                setApi_res_status('Please fill in all option fields.');
                return;
            }
            if (!options.some((option) => option.isCorrect)) {
                setApi_res_status('Please mark at least one option as correct.');
                return;
            }
        } else {
            if (!freeTypeAnswer) {
                setApi_res_status('Please fill in the free text answer.');
                return;
            }


        }

        setLoading(true);
        const formData = new FormData();
        formData.append('skill', skill);
        formData.append('questionType', questionType);
        formData.append('question', question);
        formData.append('difficulty', difficulty);
        questionImages.forEach((image) => {
            formData.append('questionImages', image);
        });

        if (questionType.includes('mcq')) {
            options.forEach((option, index) => {
                formData.append(`options[${index}][option]`, option.option);
                if (option.image) {
                    formData.append(`options[${index}][image]`, option.image);
                }
                formData.append(`options[${index}][isCorrect]`, option.isCorrect);
            });
        } else {
            formData.append('freeTypeAnswer', freeTypeAnswer);
            if (freeTypeImage) {
                formData.append('freeTypeImage', freeTypeImage);
            }
        }

        try {
            const response = await fetch(`${api_url}/questions_answers`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setApi_res_status('Question and Answer submitted successfully!');
            } else {
                setApi_res_status('Failed to save question and answer.');
            }
        } catch (error) {
            setApi_res_status('An error occurred while saving.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setSkill('');
        setQuestionType('');
        setQuestion('');
        setQuestionImages([]);
        setOptions([{ option: '', image: null, isCorrect: false }]);
        setFreeTypeAnswer('');
        setFreeTypeImage(null);
        setApi_res_status(null);
        setDifficulty('');
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="lg:w-3/4 mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-xl font-bold mb-4">Set Your Question</h1>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Choose Skill</label>
                    <SkillsDropdown skill={skill} setSkill={setSkill} />
                </div>
                <div className="flex justify-between mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type of Question</label>
                        <select
                            value={questionType}
                            onChange={(e) => setQuestionType(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select type of question</option>
                            <option value="mcq-single">Multiple Choice - Single Correct</option>
                            <option value="mcq-multiple">Multiple Choice - Multiple Correct</option>
                            <option value="free">Free Text</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select difficulty level</option>
                            <option value="easy">Easy</option>
                            <option value="normal">Normal</option>
                            <option value="difficult">Difficult</option>
                        </select>
                    </div>
                </div>
                <div className="relative mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type Question</label>
                    <div className="flex items-center relative mb-2">
                        <textarea
                            placeholder="Type question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="block w-full p-2 pr-14 border border-gray-300 rounded-md"
                        />
                        <label className="absolute top-2 right-2 cursor-pointer">
                            <AttachFile />
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <ImageUpload images={questionImages} onRemove={handleRemoveImage} />
                </div>

                {questionType.includes('mcq') && (
                    <div className="  space-y-6 mb-4">
                        {options.map((option, index) => (
                            <div key={index} className="relative p-4 border border-gray-300 rounded-lg shadow-sm">
                                <div className="absolute top-2 right-2">
                                    <input
                                        type={questionType === 'mcq-single' ? 'radio' : 'checkbox'}
                                        name="correctOption"
                                        checked={option.isCorrect}
                                        onChange={() => handleCorrectOptionChange(index)}
                                        className="mr-2"
                                    />
                                </div>
                                <div className="flex items-center mb-4">
                                    <span className="font-semibold text-gray-700">Option {index + 1}</span>
                                </div>
                                <div className="relative mb-4">
                                    <textarea
                                        placeholder={`Option ${index + 1}`}
                                        value={option.option}
                                        onChange={(e) => {
                                            const updatedOptions = [...options];
                                            updatedOptions[index].option = e.target.value;
                                            setOptions(updatedOptions);
                                        }}
                                        className="block w-full p-2 pr-14 border border-gray-300 rounded-md"
                                    />
                                    <label className="absolute top-2 right-2 cursor-pointer">
                                        <AttachFile />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleOptionImageChange(index, e.target.files[0])}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {option.image && (
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={URL.createObjectURL(option.image)}
                                            alt={`option ${index}`}
                                            className="w-32 h-32 object-cover rounded-md"
                                        />
                                        <button
                                            onClick={() => handleOptionImageChange(index, null)}
                                            className="ml-2 text-red-700 border-none bg-white hover:text-gray-600"
                                            title="Remove image"
                                        >
                                            <RemoveCircleOutline />
                                        </button>
                                    </div>
                                )}
                                <button
                                    onClick={() => setOptions(options.filter((_, i) => i !== index))}
                                    className="absolute -bottom-4 right-2 text-red-700 border-none bg-white hover:text-gray-600"
                                    title="Remove option"
                                >
                                    <RemoveCircleOutline />
                                </button>
                            </div>
                        ))}
                        <div className='flex justify-end'>
                            <button
                                onClick={() => setOptions([...options, { option: '', image: null, isCorrect: false }])}
                                className='border-none -mt-12 mr-12 z-10 text-blue-600 bg-white hover:text-blue-900'
                                title='Add option'
                            >
                                <AddCircleOutline />
                            </button>
                        </div>

                    </div>
                )}

                {questionType === 'free' && (
                    <div>
                        <div className="relative mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Free Text Answer</label>
                            <div className="flex items-center relative">
                                <textarea
                                    placeholder="Type free text answer"
                                    value={freeTypeAnswer}
                                    onChange={(e) => setFreeTypeAnswer(e.target.value)}
                                    className="block w-full p-2 pr-14 border border-gray-300 rounded-md"
                                />
                                <label className="absolute top-2 right-2 cursor-pointer">
                                    <AttachFile />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFreeTypeImage(e.target.files[0])}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                        {freeTypeImage && (
                            <div className="flex items-center mb-4">
                                <img src={URL.createObjectURL(freeTypeImage)} alt="free type answer" className="w-32 h-32 object-cover rounded-md" />
                            </div>
                        )}
                    </div>
                )}

                {api_res_status && (
                    <p className="text-red-700 mb-4 text-center">{api_res_status}</p>
                )}

                <div className="flex justify-between space-x-4">
                    <Button onClick={resetForm} variant="outlined" color="secondary">
                        Reset
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Questionsetter;
