import React, { useState } from 'react';

function Questionsetter() {
    const [skill, setSkill] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [questionFormat, setQuestionFormat] = useState('');
    const [question, setQuestion] = useState('');
    const [imageQuestion, setImageQuestion] = useState(null);
    const [options, setOptions] = useState(['', '', '', '']);
    const [answer, setAnswer] = useState('');

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleImageUpload = (event) => {
        setImageQuestion(URL.createObjectURL(event.target.files[0]));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format of Question</label>
                    <select
                        value={questionFormat}
                        onChange={(e) => setQuestionFormat(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select question format</option>
                        <option value="text">Text</option>
                        <option value="image">Image</option>
                    </select>
                </div>
                {questionFormat === 'text' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type Question</label>
                        <input
                            placeholder="Type question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                )}
                {questionFormat === 'image' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Question Image</label>
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                        {imageQuestion && <img src={imageQuestion} alt="Question" width="100" className="mt-2" />}
                    </div>
                )}
                {questionType === 'mcq' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                        {options.map((option, index) => (
                            <input
                                key={index}
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded-md mb-2"
                            />
                        ))}
                    </div>
                )}
                {questionType === 'free' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Free Text Answer</label>
                        <input
                            placeholder="Free text answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Questionsetter;
