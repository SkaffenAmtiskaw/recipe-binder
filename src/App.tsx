import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import{ Button, Pane, majorScale } from 'evergreen-ui';

import Add from './pages/Add';
import List from './pages/List';
import Recipe from './pages/Recipe';
import db from './firebase';

export const TagContext = React.createContext<string[]>([]);

const dedupe = (array: any[]) => array.filter((value, idx) => array.indexOf(value) === idx);

const App = () => {
  const name = 'sarah';

  const [user, setUser] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('users').where('name', '==', name).onSnapshot((snapshot) => {
      if (snapshot.docs.length) {
        setUser(snapshot.docs[0].id);
        setRecipes(snapshot.docs[0].data().recipes);
      }

    }, (err) => {
      console.log(err);
    });

    return unsubscribe;
  },[]);

  return (
    <Router>
      <TagContext.Provider value={dedupe(recipes.reduce((array, { tags }) => [...array, ...tags], []))}>
        <Pane background="tealTint" padding={majorScale(3)}>
          <Button is={Link} to="/add">Add Recipe</Button>
        </Pane>
        <Pane padding={majorScale(3)}>
          <Switch>
            <Route path="/add">
              <Add user={user} recipes={recipes} />
            </Route>
            <Route path="/view/:id">
              <Recipe recipes={recipes} />
            </Route>
            <Route path="*">
              <List recipes={recipes} />
            </Route>
          </Switch>
        </Pane>
      </TagContext.Provider>
    </Router>
  );
}

export default App;
