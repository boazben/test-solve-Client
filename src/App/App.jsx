import { createContext, useContext, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Entrance, { UserContext } from '../Entrance/Entrance'
import { serverReq } from '../functions'
import Guest from '../Guest/Guest'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import About from '../Pages/About/About'
import Dashboard from '../Pages/Dashboard/Dashboard'
import Homepage from '../Pages/Homepage/Homepage'
import MyTests from '../Pages/MyTests/MyTests'
import Test from '../Pages/Test/Test'
import TestForm from '../Pages/TestForm/TestForm'
import './app.css'

export const LoginState = createContext()

function App() {
  const [login, setLogin] = useState(false)
  
  useEffect(() => {
    async function loginWithToken() {
        try {
            if (localStorage.token || sessionStorage.token) {
                const response =   await serverReq('post', '/locaSLogin')
                // console.log(`In Entrance page, responce: ${response}`)
                setLogin(true)
                
            }
            else{
                setLogin(false)
            }
            
        } catch (error) {
           // console.log(`In Entrance page, error: ${error.response?.data?.error || error.message || error}`)
            
        }
    }
    loginWithToken()
  }, [])

  return (
    <div className='App'>
      <LoginState.Provider value={[login, setLogin]}>
      {
        login ? 
      <div className="content-wrap">
      <Entrance>
          <Header />
          <Switch>
            <Route path="/" component={Homepage} exact />
            <Route path="/my-created" component={Dashboard} />
            <Route path="/test-form/:testId" component={TestForm} />
            <Route path="/my-tests" component={MyTests} />
            <Route path="/test/:testId" component={Test} />
            <Route path="/about" component={About} />
            <Route path="/website-information" component={About} />
          </Switch>
          <Footer />
      </Entrance>
      </div>
      : 
      <div className="content-wrap">
        <Guest />
      </div>
      }
    </ LoginState.Provider>
    </div>
  )
}

export default App
