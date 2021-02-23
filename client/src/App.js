import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Post from "./components/Post";
import UpdateModal from "./components/UpdateModal";
import About from "./components/About";
import Error404 from "./components/Error404";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/dashboard" component={() => <Dashboard />} />
          <Route path="/post/:id" component={(props) => <Post {...props}/>} />
          <Route exact path="/edit/:id" component={() => <UpdateModal />} />
          <Route exact path="/about" component={() => <About />} />
          <Route component={Error404} />
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App;