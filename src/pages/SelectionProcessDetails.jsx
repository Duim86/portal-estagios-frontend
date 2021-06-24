import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function SelectionProcess() {
  const params = useParams();
  const [selectionProcess, setSelectionProcess] = useState({})
  const token = localStorage.getItem('token');

  useEffect(() => {
    api.get(`selection-process/${params.id}`).then(response => {
      setSelectionProcess(response.data);
    })
  }, [params.id]);

  if (!selectionProcess) {
    return <p>Carregando...</p>;
  }

  async function handleRegister() {
    await api.put(`selection-process/${params.id}/register`);
  }

  return (
    <>
      <h1>{selectionProcess.title}</h1>
      {token && <button className="btn btn-lg btn-primary btn-block" type="button" onClick={handleRegister}>Entrar</button>}
    </>
  )
}