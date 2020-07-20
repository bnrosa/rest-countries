import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CardList from './components/card-list.component';
import Navbar from './components/navbar.component';
import SingleFlag from './components/single-flag.component';
import {Provider} from 'react-redux';

import store from './store';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Navbar/> 
            <Switch>
              <Route path="/" exact component={CardList} />
              <Route path="/:id" component={SingleFlag} />
            </Switch>
      </Provider>
    </Router>
  );
}

export default App;
