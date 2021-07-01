import { useState, useEffect } from 'react';
import Header from '../components/Header';

import api from '../services/api';

import '../styles/selection-process.css';

export default function SelectionProcess() {
  const [selectionProcesses, setSelectionProcesses] = useState(null);

  useEffect(() => {
    api.get('selection-process').then((response) => {
      setSelectionProcesses(response.data);
    });
  }, []);

  return (
    <div className="container">
      <Header />
      {!selectionProcesses ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        selectionProcesses.map((selectionProcess) => (
          <div className="card selection-process" key={selectionProcess.id}>
            <h5 className="card-header">{selectionProcess.companyName}</h5>
            <div className="card-body">
              <h5 className="card-title">{selectionProcess.status}</h5>
              <p className="card-text">{selectionProcess.title}</p>
              <a
                href={`/selection-process/${selectionProcess.id}`}
                className="btn btn-primary"
              >
                Saiba +
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
