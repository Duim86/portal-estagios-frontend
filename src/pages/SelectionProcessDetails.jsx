/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import api from '../services/api';

import '../styles/selection-process.css';

export default function SelectionProcess() {
  const params = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [selectionProcess, setSelectionProcess] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [studentList, setStudentList] = useState(null);

  useEffect(async () => {
    const res = await api.get(`selection-process/${params.id}`);
    setSelectionProcess(res.data);
    setStudentList(res.data.studentList);
  }, [params.id]);

  useEffect(() => {
    if (user && studentList) {
      setIsRegistered(studentList.some((student) => student.id == user.id));
    }
  }, [studentList]);

  async function handleRegister() {
    setStudentList((oldList) => [
      ...oldList,
      { id: Number(user.id), firstName: user.firstName },
    ]);

    await api.put(`selection-process/${params.id}/register`);
  }

  async function handleUnregister() {
    setStudentList((students) =>
      students.filter((student) => student.id != user.id),
    );
    await api.put(`selection-process/${params.id}/leave`);
  }

  return (
    <>
      <Header />
      {!selectionProcess ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="selection-process">
          <h1>{selectionProcess.title}</h1>
          {user && (
            <>
              {isRegistered ? (
                <button
                  className="btn btn-lg btn-danger btn-block"
                  type="button"
                  onClick={handleUnregister}
                >
                  Sair
                </button>
              ) : (
                <button
                  className="btn btn-lg btn-primary btn-block"
                  type="button"
                  onClick={handleRegister}
                >
                  Entrar
                </button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
