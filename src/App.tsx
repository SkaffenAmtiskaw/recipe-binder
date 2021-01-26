import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import{ Button } from 'evergreen-ui';

import Add from './pages/Add';

function App() {
  return (
    <Router>
      <div>
        <Button is={Link} to="/add">Add Recipe</Button>
      </div>
      <Switch>
        <Route path="/add">
          <Add />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
