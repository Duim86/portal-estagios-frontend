import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function SelectionProcess() {
  const params = useParams();
  const [selectionProcess, setSelectionProcess] = useState({})

  useEffect(() => {
    api.get(`selection-process/${params.id}`).then(response => {
      setSelectionProcess(response.data);
    })
  }, [params.id]);

  if (!selectionProcess) {
    return <p>Carregando...</p>;
  }

  return (
    <h1>{selectionProcess.title}</h1>
  )
}