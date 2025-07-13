import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

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
        <Routes>
          <Route path="/add" element={<Add user={user} recipes={recipes} />} />
          <Route
            path="/view/:id"
            element={<Recipe user={user} recipes={recipes} />}
          />
          <Route
            path="/edit/:id"
            element={<Edit user={user} recipes={recipes} />}
          />
          <Route
            path="/meal-plan/:date"
            element={<Menu menus={menus} user={user} />}
          />
          <Route
            path="/meal-plan"
            element={<Menu menus={menus} user={user} />}
          />
          <Route path="*" element={<List recipes={recipes} />} />
        </Routes>
      </TagContext.Provider>
    </Router>
  );
};

export default App;
