import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response =>{
      setProjects(response.data);
    })
  }, []); 

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Novo projeto ${Date.now()}`,
      url: 'https://github.com',
      techs: ['Node.js', 'React']
    });
    const project = response.data;
    setProjects([...repositories, project]);
  }

  async function handleRemoveRepository(id) {
    const projectIndex = repositories.findIndex(project => project.id === id);
    if (projectIndex >= 0){
      const updatedList = [...repositories];
      updatedList.splice(projectIndex, 1);
      setProjects(updatedList);
      await api.delete(`repositories/${id}`);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(project => 
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>Remover</button>
          </li>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
