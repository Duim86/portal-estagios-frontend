import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Footer from './components/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SelectionProcess from './pages/SelectionProcess';
import SelectionProcessDetails from './pages/SelectionProcessDetails';
import Management from './pages/Management';
import Profile from './pages/Profile';

import './styles/global.css';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const GuestRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Redirect to="/selection-process" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <GuestRoute path="/sign-in" exact component={Login} />
      <GuestRoute path="/sign-up" exact component={SignUp} />

      <Route path="/" exact component={SelectionProcess} />
      <Route
        path="/selection-process/:id"
        exact
        component={SelectionProcessDetails}
      />

      <Route path="/profile" exact component={Profile} />
      <PrivateRoute path="/management" exact component={Management} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default Routes;
