import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';
import Task from './pages/Task/Task';

export const useRouts = (isAuth) => {

   if(isAuth) {
      return(
         <Switch>
            <Route path='/' exact component={MainPage}/>
            <Route path='/task/:id' exact component={Task}/>
            <Redirect to='/'/>
         </Switch>
      )
   }

   return(
      <Switch>
         <Route path='/login' exact component={AuthPage}/>
         <Route path='/registration' exact component={AuthPage}/>
         <Redirect to='/login'/>
      </Switch>
   )
}