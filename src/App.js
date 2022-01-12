import { Route, Switch } from "react-router-dom";
import "./App.css";
import Inbox from "./components/Inbox/Inbox";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Inbox />
        </Route>
        <Route path="/:id">
          <Inbox split={true} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
