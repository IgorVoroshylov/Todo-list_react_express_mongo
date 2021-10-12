import React, { useContext } from 'react';
import 'materialize-css';
import '../../App.scss'
import { useHistory } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
   const history = useHistory()
   const { logOut, userName, isAuth } = useContext(AuthContext)

   const logOutHandler = event => {
      event.preventDefault();
      logOut();
      history.push('/');
   }

   return (
           <nav className='green lighten-2'>
               <div className="nav-wrapper logo_margin">
                  <a href="/" className="brand-logo">TODO</a>
                  <div>
                     <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>{isAuth ? userName : ''}</li>
                        <li><a href='/' onClick={logOutHandler}>{isAuth ? "Exit" : ''}</a></li>
                     </ul>
                  </div>
               </div>
            </nav>
   )
}

export default Navbar;
