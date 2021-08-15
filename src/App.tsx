import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from "./components/login"
import ProtectedRoute from "./components/ProtectedRouter"
import Pokedex from "./components/Pokedex"

import Pokemon from './components/pokemon';




export default function App() {
  return (
    <>

      <Switch>
        <Route path='/login' render={() => <Login />} />



        <ProtectedRoute >
          <Switch>
            <Route path='/pokedex/:id' render={() => <Pokemon />} />
            <Route path='/pokedex' render={() => <Pokedex />} />
            <Redirect from="/" to="/login" />
          </Switch>
        </ProtectedRoute>





      </Switch>
    </>
  );
}

/* <Route exact path='/pokedex/:id' render={() => <Pokemon />} /> */
