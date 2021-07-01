import { useEffect, useState } from 'react';
import api from '../services/api';

import fallbackImg from '../assets/fallback.svg';

export default function MyProfile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    api.get('/students/profile').then((response) => {
      setProfile(response.data);
    });
  }, []);

  return (
    <div>
      <a href="/" className="d-block link-dark text-decoration-none mb-5">
        <img
          src={profile.photo || fallbackImg}
          alt="user"
          width="48"
          height="48"
          className="rounded-circle"
        />
      </a>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Nome</th>
            <td>{profile.firstName}</td>
          </tr>
          <tr>
            <th scope="row">Sobrenome</th>
            <td>{profile.lastName}</td>
          </tr>
          <tr>
            <th scope="row">Idade</th>
            <td colSpan="2">{profile.age}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
