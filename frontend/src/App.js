import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Signup from "./component/Signup";
import MessagePopup from "./lib/MessagePopup";

function App() {
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/login">
            <Login setPopup={setPopup} />
          </Route>
          <Route exact path="/signup">
            <Signup setPopup={setPopup} />
          </Route>
          <Route exact path="/logout">
            <Logout setPopup={setPopup} />
          </Route>
        </Switch>
      </div>
      <MessagePopup
        open={popup.open}
        setOpen={(status) =>
          setPopup({
            ...popup,
            open: status,
          })
        }
        severity={popup.severity}
        message={popup.message}
      />
    </BrowserRouter>
  );
}

export default App;
