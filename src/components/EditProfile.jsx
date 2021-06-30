import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import api from '../services/api';
import '../styles/login.css';

export default function EditProfile() {
  const history = useHistory();
  const [disableButton, setDisableButton] = useState(true);

  const { register, handleSubmit } = useForm({});

  async function onSubmit(data) {
    const dados = data;

    if (dados.firstName === '') {
      dados.firstName = null;
    }
    if (dados.lastName === '') {
      dados.lastName = null;
    }
    if (dados.age === '') {
      dados.age = null;
    }
    if (dados.photo === '') {
      dados.photo = null;
    }

    try {
      console.log(data);
      setDisableButton(!disableButton);

      await api.put('/students/', dados);
      setDisableButton(!disableButton);

      history.push('/profile');
    } catch (err) {
      console.log(err.response.data.status);
    }
  }

  return (
    <>
      <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 font-weight-normal">Atualize seu Perfil</h1>

        <input
          type="text"
          name="firstName"
          placeholder="Nome"
          className="form-control"
          {...register('firstName')}
        />

        <input
          type="text"
          name="lastName"
          className="form-control"
          placeholder="Sobrenome"
          {...register('lastName')}
        />

        <input
          type="text"
          name="photo"
          className="form-control"
          placeholder="Foto"
          {...register('photo')}
        />
        <input
          type="number"
          name="age"
          className="form-control"
          placeholder="Idade"
          {...register('age')}
        />

        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Atualizar
        </button>
      </form>
    </>
  );
}
