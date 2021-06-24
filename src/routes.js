import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './pages/Login';
import SelectionProcess from "./pages/SelectionProcess";
import SelectionProcessDetails from "./pages/SelectionProcessDetails";
import Management from "./pages/Management";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/selection-process" exact component={SelectionProcess} />
        <Route path="/selection-process/:id" component={SelectionProcessDetails} />
        <Route path="/management" exact component={Management} />
      </Switch>    
    </BrowserRouter>
  )
}

export default Routes;