import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';

const ProjectList = () => {
  const { isLoggedIn, username, token } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

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

  return (
    <div className="container">
    <h2 className="mt-5">Projects</h2>
    {projects.map((project, index) => (
      <div key={index} className="card mt-3">
        <div className="card-body">
          <h3 className="card-title">Name: {project.name}</h3>
          <p className="card-text">Description: {project.description}</p>
          <p className="card-text">Start Date: {project.start_date}</p>
          <p className="card-text">End Date: {project.end_date}</p>
          <p className="card-text">Owner: {username}</p>
        </div>
      </div>
      ))}
    </div>
  );
};

export default ProjectList;