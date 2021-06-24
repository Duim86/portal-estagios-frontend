import {useState, useEffect } from 'react';
import api from '../services/api';

export default function SelectionProcess() {
  const [selectionProcesses, setSelectionProcesses] = useState([{}])
  
  useEffect(() => {
    api.get('selection-process').then(response => setSelectionProcesses(response.data))
  }, [])
  
  return (
    <div>
      {selectionProcesses.filter(selectionProcess => selectionProcess.status !== 'PENDENTE').map(selectionProcess => (      
        <div className="card" key={selectionProcess.id}>
          <h5 className="card-header">{selectionProcess.companyName}</h5>
          <div className="card-body">
            <h5 className="card-title">{selectionProcess.status}</h5>
            <p className="card-text">{selectionProcess.title}</p>
            <a href={`/selection-process/${selectionProcess.id}`} className="btn btn-primary">Saiba +</a>
          </div>
        </div>
      ))}
    </div>
    )
  }