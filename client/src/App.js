import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home";
import EditPost from "./components/EditPost";
import NewPost from "./components/NewPost";
import About from "./components/About";
import Error404 from "./components/Error404";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/edit/:id" component={() => <EditPost />} />
          <Route exact path="/create" component={() => <NewPost />} />
          <Route exact path="/about" component={() => <About />} />
          <Route component={Error404} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;