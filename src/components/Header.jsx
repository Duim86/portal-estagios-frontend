import { Link, useHistory } from 'react-router-dom';
import authenticationUtils from '../utils/token';
import fallbackImg from '../assets/fallback.svg';

export default function Header() {
  const history = useHistory();
  const token = authenticationUtils.getUserActive();

  function handleLogout() {
    localStorage.removeItem('token');
    history.push('/sign-up');
  }

  return (
    <header className="col-12 d-flex align-items-center justify-content-center justify-content-evenly py-3 mb-4 border-bottom">
      <ul className="nav col-6 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <Link to="/" className="nav-link px-2 link-primary">
            Home
          </Link>
        </li>
      </ul>
      {token ? (
        <div className="col-6 d-flex justify-content-end align-items-center">
          <p className="mb-0 me-3 text-center d-block text-primary">
            Olá, <strong>{token?.entity.firstName || 'bem vindo'}</strong>!
          </p>
          <a href="/" className="d-block link-dark text-decoration-none">
            <img
              src={token?.entity.photo || fallbackImg}
              alt="user"
              width="48"
              height="48"
              className="rounded-circle"
            />
          </a>
          <button
            className="btn btn-sm btn-dark ms-4"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/sign-in" className="btn btn-lg btn-primary btn-block">
            Login
          </Link>
          <Link
            to="/sign-up"
            className="btn btn-lg btn-outline-primary btn-block ms-3"
          >
            Criar Conta
          </Link>
        </div>
      )}
    </header>
  );
}
