import JwtDecode from 'jwt-decode';

const isAuthenticated = () => {
  if (
    localStorage.getItem('token') === null ||
    typeof localStorage.getItem('token') === 'undefined'
  ) {
    return false;
  }
  return true;
};

const getUserActive = () => {
  if (isAuthenticated()) {
    const decoded = JwtDecode(localStorage.getItem('token'));
    return decoded;
  }
  return false;
};

const authenticationUtils = {
  isAuthenticated,
  getUserActive,
};

export default authenticationUtils;
