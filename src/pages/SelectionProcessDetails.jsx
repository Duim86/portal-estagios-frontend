import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

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
    try {
      await api.put(`selection-process/${params.id}/register`);
      setStudentList((oldList) => [
        ...oldList,
        { id: Number(user.entity.id), firstName: user.entity.firstName },
      ]);
    } catch (error) {
      const { status, detail } = error.response.data;

      if (status === 400) {
        console.log(detail);
      }
      if (status === 500) {
        console.log(detail);
      }
    }
  }

  async function handleUnregister() {
    try {
      await api.put(`selection-process/${params.id}/leave`);
      setStudentList((students) =>
        students.filter((student) => student.id !== Number(user.entity.id)),
      );
    } catch (error) {
      console.log(error.response.data);
    }
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
