import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SelectionProcess from "./pages/SelectionProcess";
import SelectionProcessDetails from "./pages/SelectionProcessDetails";
import Management from "./pages/Management";

const PrivateRoute = ({component: Component, ...rest}) => {
  const isAuthenticated = localStorage.getItem('token');
  return (
        <Route 
          {...rest}
          render={props =>
            isAuthenticated ? <Component {...props}/> : <Redirect to="/" />}
        />
  )
}

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/sign-up" exact component={SignUp} />
        
        <PrivateRoute path="/selection-process" exact component={SelectionProcess} />
        <PrivateRoute path="/selection-process/:id" exact component={SelectionProcessDetails} />
        <PrivateRoute path="/management" exact component={Management} />
      </Switch>    
    </BrowserRouter>
  )
}

export default Routes;