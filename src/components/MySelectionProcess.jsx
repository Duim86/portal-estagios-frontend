import { useEffect, useState } from 'react';
import api from '../services/api';

export default function MySelectionProcesses() {
  const [selectionProcesses, setSelectionProcesses] = useState([]);

  useEffect(() => {
    api.get('/students/profile').then((response) => {
      setSelectionProcesses(response.data.selectionProcess);
    });
  }, []);
  return (
    <div className="d-flex">
      {selectionProcesses.map((selectionProcess) => (
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
      ))}
    </div>
  );
}
