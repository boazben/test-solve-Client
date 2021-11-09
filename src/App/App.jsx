import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'
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
import TestPreview from '../Pages/Test/TestPreview/TestPreview'
import './app.css'

export const LoginState = createContext()
export const WidthScreen = createContext()

function App() {
  const [login, setLogin] = useState(false)
  const [width, setWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    function updateWith() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateWith);
    updateWith();
    return () => window.removeEventListener('resize', updateWith);
}, []);
  
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
      <WidthScreen.Provider value={[width, setWidth]} >
      <LoginState.Provider value={[login, setLogin]}>
        {/* <Navbar> 
          <NavItem icon="fas fa-sort-down"/>
          <NavItem icon="fas fa-sort-down"> 
            <DropdownMenu></DropdownMenu>
          </NavItem>
        </Navbar> */}
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
            <Route path="/test-preview/:testId" component={TestPreview} />
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
    </ WidthScreen.Provider>
    </div>
  )
}

export default App


function Navbar({children}) {

  return (
      <nav className='navbar'>
        <ul className='navbar-nav'>{children}</ul>
      </nav>

  )
}

function NavItem({icon, children}) {
  const [open,  setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}> 
        <i className={`${icon}`}></i>
      </a>
      {open && children}
    </li>

  )
}

function DropdownMenu() {

  function DropdownItem({leftIcon, rightIcon, children}) {

    return(
      <a href="#" className="menu-item">
        <span className="icon-button">{leftIcon}</span>
        {children}
        <span className="icon-button">{rightIcon}</span>
      </a>
    )
  }

  return (
    <div className="dropdown">
      <DropdownItem>My Profile</DropdownItem>
      <DropdownItem leftIcon={"icon"}></DropdownItem>
    </div>
  )
}

