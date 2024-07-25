import React from 'react'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Candidates from './components/candidates/Candidates';
import Skills from './components/skills/Skills';
import Competency from './components/competency/Competency';
import JobRole from './components/jobrole/JobRole';
import CompetencySkills from './components/competencySkills/CompetencySkills';
import Header from './components/navigation/Header';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Candidates />
    },
    {
      path: '/skills',
      element: <Skills />
    },
    {
      path: 'competency',
      element: <Competency />
    },
    {
      path: 'jobrole',
      element: <JobRole />
    },
    {
      path: 'comp_skills',
      element: <CompetencySkills />
    },
  ])

  return (
    <div>
      <Header />
      <RouterProvider router={router} />

    </div>
  )
}

export default App
