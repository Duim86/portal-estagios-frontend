import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';


import api from '../services/api';
import '../styles/login.css';

export default function Login() {
  const history = useHistory();
  const [disableButton, setDisableButton] = useState(true);
  const [error, setError] = useState(false)  
  
  const { register, handleSubmit } = useForm({});
  
  async function onSubmit(data) {
    try {
      setDisableButton(!disableButton);
      
      const res = await api.post('/login', data);
      let token = res.headers.authorization      
      token = token.replace("Bearer ", ""); 
      localStorage.setItem('token', token);
      const user = await api.get('/students/token');
      localStorage.setItem('user', JSON.stringify(user));

      setError(false);      
      setDisableButton(!disableButton);
      
      history.push('/selection-process');
    } catch(error) {
      setError(true);
    }
  }
  
  return (
    <>
      <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 font-weight-normal">Acesso ao <br />Portal de Estágio</h1>      
        {
          error && <p className="alert alert-danger">
          O e-mail ou senha não confere
          </p>
        }
    
    
      <input 
        type="email"
        name="username" 
        placeholder="Seu e-mail"
        className="form-control"
        {...register('username')}
        required 
        autoFocus 
      />
      
      <input 
        type="password" 
        name="password" 
        className="form-control" 
        placeholder="Sua senha"
        {...register('password')}
        required 
      />
    
      <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
      
    </form>
    <Link to="sign-up"className="btn btn-lg btn-dark">Sign-Up</Link>
  </>
  )
}