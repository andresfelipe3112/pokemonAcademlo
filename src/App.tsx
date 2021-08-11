import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from "./components/login"
import ProtectedRoute from "./components/ProtectedRouter"
import Pokedex from "./components/Pokedex"



export default function App() {
  return (
    <>
      <Switch>

        <Route path='/login' render={() => <Login />} />

        <ProtectedRoute >
          <Pokedex />
        </ProtectedRoute>

        <Redirect from="/" to="/login" />

      </Switch>
    </>
  );
}


