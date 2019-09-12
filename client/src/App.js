import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import Home from "./components/Home";
import About from "./components/About";
import Error404 from "./components/Error404";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/about" component={() => <About />} />
          <Route component={Error404} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;