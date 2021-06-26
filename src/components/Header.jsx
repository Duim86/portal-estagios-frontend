import { Link, useHistory } from 'react-router-dom';

import fallbackImg from '../assets/fallback.svg';

export default function Header() {
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('user'));

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('');
  }

  return (
    <header className="col-12 d-flex align-items-center justify-content-center justify-content-md-evenly py-3 mb-4 border-bottom">
      <ul className="nav col-6 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <Link to="/" className="nav-link px-2 link-secondary">
            Home
          </Link>
        </li>
        <li>
          <Link to="/selection-process" className="nav-link px-2 link-dark">
            Oportunidades
          </Link>
        </li>
      </ul>
      <div className="col-6 d-flex justify-content-end align-items-center">
        <p className="mb-0 mr-3 text-center d-block text-primary">
          Olá, <strong>{user?.data.firstName || 'bem vindo'}</strong>!
        </p>
        <a href="/" className="d-block link-dark text-decoration-none">
          <img
            src={user?.data.photo || fallbackImg}
            alt="user"
            width="48"
            height="48"
            className="rounded-circle"
          />
        </a>
        <button
          className="btn btn-sm btn-dark ml-4"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
