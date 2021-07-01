import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import '../styles/login.css';
import api from '../services/api';

export default function SignUp() {
  const history = useHistory();
  const { register, handleSubmit } = useForm({});

  async function onSubmit(data) {
    await api.post('registration/student', data);
    history.push('/sign-in');
  }

  return (
    <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h3 mb-3 font-weight-normal">Crie sua conta</h1>

      <input
        type="email"
        name="email"
        placeholder="Seu e-mail"
        className="form-control"
        {...register('email')}
        required
      />

      <input
        type="password"
        name="password"
        className="form-control"
        placeholder="Sua senha"
        {...register('password')}
        required
      />
      <input
        type="password"
        name="password2"
        className="form-control"
        placeholder="Confirme sua Senha"
        {...register('password2')}
        required
      />

      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Criar
      </button>
    </form>
  );
}
