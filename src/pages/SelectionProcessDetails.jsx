import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import authenticationUtils from '../utils/token';
import api from '../services/api';
import '../styles/selection-process.css';

export default function SelectionProcess() {
  const params = useParams();
  const user = authenticationUtils.getUserActive();
  const [selectionProcess, setSelectionProcess] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [studentList, setStudentList] = useState([]);

  useEffect(async () => {
    const res = await api.get(`selection-process/${params.id}`);
    setSelectionProcess(res.data);
    setStudentList(res.data.studentList);
  }, [params.id]);

  useEffect(() => {
    if (user && studentList) {
      setIsRegistered(
        studentList.some((student) => student.id === Number(user.entity.id)),
      );
    }
  }, [studentList]);

  async function handleRegister() {
    setStudentList((oldList) => [
      ...oldList,
      { id: Number(user.entity.id), firstName: user.entity.firstName },
    ]);

    await api.put(`selection-process/${params.id}/register`);
  }

  async function handleUnregister() {
    setStudentList((students) =>
      students.filter((student) => student.id !== Number(user.entity.id)),
    );
    await api.put(`selection-process/${params.id}/leave`);
  }

  return (
    <>
      {!selectionProcess ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="selection-process">
          <h1>{selectionProcess.title}</h1>
          <h5>Inscritos: {studentList.length}</h5>
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
