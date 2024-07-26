import React, { useEffect, useState } from 'react';
import './App.css';
import AddCandidateModal from './AddjobroleModal';
import EditCandidateModal from './EditjobroleModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function JobRole() {
    const [jobrole, setjobroleData] = useState([]);
    const [open, setopen] = useState(false);
    const [query, setQuery] = useState('');
    const [insertionStatus, setInsertionStatus] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [recentData, setrecentData] = useState('');
    const [recenteditData, setrecenteditData] = useState('');
    const [filteredData, setfilteredData] = useState([]);
    const [editOpen, setEditOpen] = useState(false);
    const [currentCandidate, setcurrentCandidate] = useState(null);
    const api_url = process.env.REACT_APP_API_URL
    const navigate = useNavigate()


    useEffect(() => {
        if (insertionStatus) {
            getjobroleDetails()
            setInsertionStatus(false);
        }
    }, [insertionStatus, recentData, jobrole]);

    const handleopen = () => { setopen(true); }
    const handleclose = () => { setopen(false); console.log("closed"); }
    const handleEditOpen = (candidate, index) => {
        setcurrentCandidate(candidate); setEditOpen(true);

    }
    const handleEditClose = () => { setEditOpen(false); setcurrentCandidate(null); }

    const getjobroleDetails = async () => {
        let result = await fetch(`${api_url}/jobrole`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
        result = await result.json();
        console.log(result);
        setjobroleData(result.data);
        setfilteredData(result.data);
        console.log(jobrole)
    }

    useEffect(() => {
        getjobroleDetails();
    }, []);

    const handleDelete = async (id) => {
        console.log(id);
        const res = await fetch(`${api_url}/deletejobrole/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': "application/json" },
        });
        if (res.ok) {
            console.log("deleted successfully");
            const updatedjobrole = jobrole.filter(jobrole => jobrole.jobrole_id !== id);
            setjobroleData(updatedjobrole);
            setfilteredData(updatedjobrole);
        } else {
            console.log("error occurred");
        }
    }

    const handleSearch = (e) => {
        console.log(query);
        const searchQuery = e.target.value.toLowerCase();
        setQuery(searchQuery);
        if (!searchQuery) {
            setfilteredData(jobrole);
        } else {
            const result = jobrole.filter(jobrole => jobrole.jobrole_name.toLowerCase().includes(searchQuery));
            setfilteredData(result);
        }
    }

    useEffect(() => {
        console.log("change")
        if (editStatus) {
            getjobroleDetails()
            setEditStatus(false)
        }
    }, [editStatus]);

    const Openjobrolecompetency = (currentjobrole) => {
        navigate('/jobrole_competency', { state: { currentjobrole, jobrole } })


    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-center text-2xl font-bold mb-8">jobrole</h1>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                    <input
                        placeholder="Search candidates"
                        value={query}
                        onChange={handleSearch}
                        className="border p-2 rounded-lg"
                        type="text"
                    />
                    <button className="bg-blue-500 text-white p-2 rounded-lg"><SearchIcon /></button>
                </div>
                <div>
                    <button
                        onClick={handleopen}
                        className="bg-green-500 text-white p-2 rounded-lg"
                    >
                        <AddIcon />
                    </button>
                    {open && <AddCandidateModal handleclose={handleclose} setStatus={setInsertionStatus} setRecentformData={setrecentData} />}
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">description</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((jobrole, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border p-2">{jobrole.jobrole_id}</td>
                                <td className="border p-2">{jobrole.jobrole_name}</td>
                                <td className="border p-2">{jobrole.jobrole_description}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => handleDelete(jobrole.jobrole_id)}
                                        className="text-bg-gray-800 border-none  p-1 rounded-lg mr-2"
                                        title='delete'
                                    >
                                        <DeleteIcon />
                                    </button>
                                    <button
                                        onClick={() => handleEditOpen(jobrole, index)}
                                        className=" text-bg-gray-800 border-none  p-1 rounded-lg mr-2"
                                    >
                                        <EditIcon />
                                    </button>
                                    <Button variant='contained'
                                        onClick={() => Openjobrolecompetency(jobrole)}
                                    >manage competency</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editOpen && (
                <EditCandidateModal
                    Data={currentCandidate}
                    handleClose={handleEditClose}
                    setStatus={setEditStatus}
                    setRecenteditFormData={setrecenteditData}
                />
            )}
        </div>
    );
}

export default JobRole;
