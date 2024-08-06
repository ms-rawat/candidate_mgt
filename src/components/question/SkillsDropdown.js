import React, { useEffect, useState } from 'react';

function SkillsDropdown({ skill, setSkill }) {
  const [skills, setSkills] = useState([]);

  const api_url = process.env.REACT_APP_API_URL;

  const getSkillDetails = async () => {
    try {
      let result = await fetch(`${api_url}/skills`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      });
      result = await result.json();
      setSkills(result.data);

    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  useEffect(() => {
    getSkillDetails();
  }, []);

  return (
    <select
      value={skill}
      onChange={(e) => setSkill(e.target.value)}
      className="block w-full p-2 border border-gray-300 rounded-md"
    >
      <option value="">Choose skill</option>
      {skills.map((skill, index) => (
        <option key={index} value={skill.skill_id}>{skill.skill_name}</option>
      ))}
    </select>
  );
}

export default SkillsDropdown;
