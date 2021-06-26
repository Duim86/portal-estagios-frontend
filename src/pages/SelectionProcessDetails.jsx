import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import api from '../services/api';

import '../styles/selection-process.css';

export default function SelectionProcess() {
  const params = useParams();
  const [selectionProcess, setSelectionProcess] = useState(null);
  const token = localStorage.getItem('token');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get(`selection-process/${params.id}`).then((response) => {
      setSelectionProcess(response.data);
    });
  }, [params.id]);

  async function handleRegister() {
    try {
      await api.put(`selection-process/${params.id}/register`);
    } catch (err) {
      setShowModal(true);
      console.log(showModal);
    }
  }

  return (
    <>
      <Header />
      {!selectionProcess ? (
        <p>Carregando...</p>
      ) : (
        <div className="selection-process">
          <h1>{selectionProcess.title}</h1>
          {token && (
            <button
              className="btn btn-lg btn-primary btn-block"
              type="button"
              onClick={handleRegister}
            >
              Entrar
            </button>
          )}
        </div>
      )}
    </>
  );
}
