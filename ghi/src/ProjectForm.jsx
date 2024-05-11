import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const ProjectForm = () => {
  const { isLoggedIn, username, token } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isLoggedIn) {
      alert('Please log in to update your profile.');
      return;
    }

    const projectData = {
      name,
      description,
      start_date: startDate,
      end_date: endDate,
      owner: username,
    };

    try {
      const response = await fetch(`http://localhost:8000/projects/project/${username}/create/`, { // replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGoToProjects = () => {
    navigate('/projects'); // replace with your projects list route
  };

  return (
    <div className="container">
    <form onSubmit={handleSubmit} className="mt-5">
      <div className="mb-3">
        <label className="form-label">Name:</label>
        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Description:</label>
        <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Start Date:</label>
        <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">End Date:</label>
        <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Create Project</button>
      <button type="button" className="btn btn-secondary ml-2" onClick={handleGoToProjects}>Go to Projects</button>
    </form>
  </div>
  );
};

export default ProjectForm;