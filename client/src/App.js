import './App.scss'
import 'materialize-css'
import Navbar from './components/navbar/Navbar'
import {useRouts} from './routs'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/authHook'
import Preloader from './components/preloader/Preloader'

function App() {
  const {login, logOut, token, userId, ready, userName} = useAuth()
  const isAuth = !!token
  const route = useRouts(isAuth)

  return (
    <AuthContext.Provider value={{login, logOut, token, userId, ready, userName, isAuth}}>
      <div>
        <Navbar/>
        {
          !ready
          ?
          <Preloader/>
          :
          <div>
            { route }
          </div>
        }
      </div>
    </AuthContext.Provider>
  )
}

export default App;
