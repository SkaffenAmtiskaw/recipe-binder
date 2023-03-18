import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import db from '@firebase/db';
import dedupe from '@utils/dedupe';

import Menu from './pages/menu/Menu';
import Add from './pages/recipes/Add';
import Edit from './pages/recipes/Edit';
import List from './pages/recipes/List';
import Recipe from './pages/recipes/Recipe';

export const TagContext = React.createContext<string[]>([]);

const App = () => {
  const name = 'sarah';

  const [user, setUser] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [menus, setMenus] = useState({});

  useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .where('name', '==', name)
      .onSnapshot(
        (snapshot) => {
          if (snapshot.docs.length) {
            setUser(snapshot.docs[0].id);
            setRecipes(snapshot.docs[0].data().recipes);
            setMenus(snapshot.docs[0].data()['meal_plans']);
          }
        },
        (err) => {
          console.log(err);
        },
      );

    return unsubscribe;
  }, []);

  return (
    <Router>
      <TagContext.Provider
        value={dedupe(
          recipes.reduce((array, { tags }) => [...array, ...tags], []),
        )}
      >
        <Switch>
          <Route path="/add">
            <Add user={user} recipes={recipes} />
          </Route>
          <Route path="/view/:id">
            <Recipe user={user} recipes={recipes} />
          </Route>
          <Route path="/edit/:id">
            <Edit user={user} recipes={recipes} />
          </Route>
          <Route path="/meal-plan/:date">
            <Menu menus={menus} user={user} />
          </Route>
          <Route path="/meal-plan">
            <Menu menus={menus} user={user} />
          </Route>
          <Route path="*">
            <List recipes={recipes} />
          </Route>
        </Switch>
      </TagContext.Provider>
    </Router>
  );
};

export default App;
