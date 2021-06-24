import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

export default function SelectionProcess() {
  const [selectionProcesses, setSelectionProcesses] = useState([{}])
  const history = useHistory();
  
  useEffect(() => {
    api.get('selection-process').then(response => { setSelectionProcesses(response.data); console.log(response.data) })
  }, [])

  function handleLogout() {
    localStorage.removeItem('token');
    history.push('');
  }
  
  return (
    <>
      {selectionProcesses.filter((selectionProcess) => selectionProcess.status !== 'PENDENTE').map((selectionProcess, index) => (      
        <div className="card" key={index}>
          <h5 className="card-header">{selectionProcess.companyName}</h5>
          <div className="card-body">
            <h5 className="card-title">{selectionProcess.status}</h5>
            <p className="card-text">{selectionProcess.title}</p>
            <a href={`/selection-process/${selectionProcess.id}`} className="btn btn-primary">Saiba +</a>
          </div>
        </div>
      ))}
      <button className="btn btn-lg btn-primary btn-block" type="button" onClick={handleLogout}>Logout</button>
      
    </>
    )
  }