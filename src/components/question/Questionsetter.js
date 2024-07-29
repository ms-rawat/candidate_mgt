import { Button } from '@mui/material';
import React, { useState } from 'react';
import AnswerSetter from './AnswerSetter';

function Questionsetter() {
    const api_url = process.env.REACT_APP_API_URL;
    const [skill, setSkill] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [question, setQuestion] = useState('');
    const [questionImages, setQuestionImages] = useState([]); // State for multiple image files
    const [showAnswerSetter, setShowAnswerSetter] = useState(false);
    const [questionId, setQuestionId] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + questionImages.length > 10) {
            alert('You can only upload a maximum of 10 images.');
            return;
        }
        setQuestionImages([...questionImages, ...files]);
    };

    const handleSubmit = async () => {
        setLoading(true); // Set loading state
        const formData = new FormData();
        formData.append('skill', skill);
        formData.append('questionType', questionType);
        formData.append('question', question);

        // Append each image file to formData
        questionImages.forEach((image) => {
            formData.append('questionImages', image);
        });

        try {
            const response = await fetch(`${api_url}/questions_answers/questions`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setQuestionId(data.questionId); // Set question ID on success
                console.log('Success:', data);
            } else {
                console.error('Failed to save question:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const resetForm = () => {
        setSkill('');
        setQuestionType('');
        setQuestion('');
        setQuestionImages([]);
        setQuestionId(null); // Reset question ID when going back
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {showAnswerSetter && questionId ? (
                <AnswerSetter
                    questionType={questionType}
                    questionId={questionId}
                    onBack={() => {
                        resetForm(); // Reset form when going back
                        setShowAnswerSetter(false); // Show question setter again
                    }}
                />
            ) : (
                <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-xl font-bold mb-4">Set Your Question</h1>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Choose Skill</label>
                        <select
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Choose skill</option>
                            <option value="skill1">Skill 1</option>
                            <option value="skill2">Skill 2</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type of Question</label>
                        <select
                            value={questionType}
                            onChange={(e) => setQuestionType(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select type of question</option>
                            <option value="mcq">Multiple Choice</option>
                            <option value="free">Free Text</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type Question</label>
                        <input
                            placeholder="Type question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Question Images (Max 10)</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className='flex justify-between'>
                        <Button
                            onClick={handleSubmit}
                            variant="contained" color="primary"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Saving...' : 'SAVE'}
                        </Button>
                        <Button
                            onClick={() => {
                                if (questionId) {
                                    setShowAnswerSetter(true);
                                }
                            }}
                            variant="contained"
                            color="primary"
                            disabled={!questionId} // Disable if questionId is not set
                        >
                            NEXT PAGE
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Questionsetter;