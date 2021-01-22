import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Logout from "./component/Logout";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact to="/login">
            <Login />
          </Route>
          <Route exact to="/signup"></Route>
          <Route exact to="/logout">
            <Logout />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
