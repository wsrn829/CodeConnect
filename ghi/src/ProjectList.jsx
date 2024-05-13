import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const { isLoggedIn, username, token } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      if (!isLoggedIn) {
        alert('Please log in to view projects.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/projects/project/${username}/`, { // replace with your API endpoint
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }

        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProjects();
  }, [isLoggedIn, username, token]);

  const handleCreateProject = () => {
    navigate('/projects/create');
};

  return (
    <div className="container">
    <div className="d-flex justify-content-end mb-3">
        <button onClick={handleCreateProject} className="btn btn-primary">Create Project</button>
    </div>
    <h2 className="mt-3">Projects</h2>
    {projects.map((project, index) => (
        <div key={index} className="card mt-3 bg-light">
            <div className="card-body">
                <h3 className="card-title text-dark">Name: {project.name}</h3>
                <p className="card-text text-dark">Description: {project.description}</p>
                <p className="card-text text-dark">Start Date: {project.start_date}</p>
                <p className="card-text text-dark">End Date: {project.end_date}</p>
                <p className="card-text text-dark">Owner: {username}</p>
            </div>
        </div>
    ))}
</div>
  );
};

export default ProjectList;