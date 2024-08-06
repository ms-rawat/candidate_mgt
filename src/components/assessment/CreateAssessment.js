import React, { useState } from 'react';
import { Button, Slider } from '@mui/material';
import ShowJobRole from './ShowJobRole';
import ShowSkills from './ShowSkills';
import Showcompetency from './Showcompetency';
import { useNavigate } from 'react-router-dom';

function CreateAssessment() {
    const [name, setName] = useState('');
    const [assessmentBasis, setAssessmentBasis] = useState('');
    const [numQuestions, setNumQuestions] = useState('');
    const [timeToAttempt, setTimeToAttempt] = useState('');
    const [assessmentType, setAssessmentType] = useState('');
    const [inputSet, setInputSet] = useState('');
    const [orderOfQuestions, setOrderOfQuestions] = useState('');
    const [difficulty, setDifficulty] = useState(50);
    const [loading, setLoading] = useState(false);
    const [apiResStatus, setApiResStatus] = useState('');
    const [selectedJobRoles, setSelectedJobRoles] = useState([]);
    const [selectedCompetencies, setSelectedCompetencies] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [questionsIds, setquestionIds] = useState([])

    const navigate = useNavigate();
    const marks = [
        { value: 0, label: 'Easy' },
        { value: 50, label: 'Moderate' },
        { value: 100, label: 'Hard' }
    ];

    function valuetext(value) {
        const difficultyLevels = {
            0: 'Easy',
            50: 'Moderate',
            100: 'Hard'
        };
        return difficultyLevels[value];
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            name,
            assessmentBasis,
            selectedJobRoles,
            selectedCompetencies,
            selectedSkills,
            numQuestions,
            timeToAttempt,
            assessmentType,
            inputSet,
            orderOfQuestions,
            difficulty
        };
        console.log(payload)
        let apiEndpoint = `${process.env.REACT_APP_API_URL}/assessment/jobrolebased`;

        if (assessmentBasis === 'compatancy') {
            apiEndpoint = `${process.env.REACT_APP_API_URL}/assessment/competencybased`;
        } else if (assessmentBasis === 'skills') {
            apiEndpoint = `${process.env.REACT_APP_API_URL}/assessment/skillbased`;
        }

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            setquestionIds((await response.json()).selectedQuestions)
            console.log(questionsIds)
            if (response.ok) {
                setApiResStatus('Assessment created successfully!');
                setLoading(false);
            } else {
                setApiResStatus('Failed to create assessment.');
            }
        } catch (error) {
            setApiResStatus('An error occurred while creating the assessment.');
        } finally {
            setLoading(false);
        }
    };

    const handleJobRolesChange = (jobRoles) => {
        setSelectedJobRoles(jobRoles);
    };

    const handleCompetencyChange = (competencies) => {
        setSelectedCompetencies(competencies);
    };

    const handleSkillChange = (skills) => {
        setSelectedSkills(skills);
    };

    const previewQuestions = () => {
        navigate('/previewQuestion', { state: { data: questionsIds } })
    }


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="lg:w-3/4 mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className='text-center font-serif text-xl m-4'>Prepare Assessment</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name of Assessment</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name of assessment"
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>



                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Questions</label>
                        <input
                            type="number"
                            value={numQuestions}
                            onChange={(e) => setNumQuestions(e.target.value)}
                            placeholder="Number of questions"
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time to Attempt</label>
                        <input
                            type="text"
                            value={timeToAttempt}
                            onChange={(e) => setTimeToAttempt(e.target.value)}
                            placeholder="Time to attempt (in minutes)"
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Type</label>
                        <select
                            value={assessmentType}
                            onChange={(e) => setAssessmentType(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">select</option>
                            <option value="same">Same for All Participants</option>
                            <option value="set">Create Set of Assessment</option>
                            <option value="dynamic">Dynamic Questions for Each Participant</option>
                        </select>
                        {assessmentType === 'set' && (
                            <div className="mt-2">
                                <input
                                    type="text"
                                    value={inputSet}
                                    onChange={(e) => setInputSet(e.target.value)}
                                    placeholder="Input set (if applicable)"
                                    className="block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Order of Questions</label>
                        <select
                            value={orderOfQuestions}
                            onChange={(e) => setOrderOfQuestions(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">select</option>
                            <option value="same">Same Order</option>
                            <option value="shuffle">Shuffle Order</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                        <div className='w-1/3 m-2'>
                            <Slider
                                aria-label="Difficulty"
                                value={difficulty}
                                onChange={(e, newValue) => setDifficulty(newValue)}
                                getAriaValueText={valuetext}
                                step={null}
                                valueLabelDisplay="auto"
                                marks={marks}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Basis</label>
                        <select
                            value={assessmentBasis}
                            onChange={(e) => setAssessmentBasis(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">select</option>
                            <option value="jobrole">Job Role Based</option>
                            <option value="compatancy">Competency Based</option>
                            <option value="skills">Skills Based</option>
                        </select>
                    </div>

                    <div className='mb-4'>
                        {assessmentBasis === 'jobrole' && (
                            <ShowJobRole onJobRolesChange={handleJobRolesChange} />
                        )}

                        {assessmentBasis === 'compatancy' && (
                            <Showcompetency onCompetenciesChange={handleCompetencyChange} />
                        )}

                        {assessmentBasis === 'skills' && (
                            <ShowSkills onSkillsChange={handleSkillChange} />
                        )}
                    </div>

                    {apiResStatus && (
                        <>
                            <p className="text-red-700 mb-4 text-center">{apiResStatus}</p>
                            <div> <button className='flex justify-center' onClick={previewQuestions}  >ShowQuestion</button></div>
                        </>
                    )}

                    <div className="flex justify-between space-x-4">
                        <Button
                            type="reset"
                            variant='outlined'
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            variant='contained'
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateAssessment;
