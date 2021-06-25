import { useState, useEffect } from 'react';
import Header from '../components/Header';
import api from '../services/api';

import '../styles/selection-process.css';

export default function SelectionProcess() {
  const [selectionProcesses, setSelectionProcesses] = useState([{}])  
  
  useEffect(() => {
    api.get('selection-process').then(response => { setSelectionProcesses(response.data); console.log(response.data) })
  }, [])
  
  return (
    <div className="container">
      <Header />
      {/* {selectionProcesses.filter((selectionProcess) => selectionProcess.status !== 'PENDENTE').map((selectionProcess, index) => (     */}
      {selectionProcesses.filter((selectionProcess) => selectionProcess.status !== 'PENDENTE').map((selectionProcess, index) => (    
        <div className="card selection-process" key={index}>
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