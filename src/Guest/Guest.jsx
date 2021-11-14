import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Entrance from '../Entrance/Entrance'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import About from '../Pages/About/About'
import Homepage from '../Pages/Homepage/Homepage'
import NotFound from '../Pages/NotFound/NotFound'

export default function Guest() {
    return (
        <div>
           <Header />
           <Switch>
            <Route path="/" component={Homepage} exact />
            <Route path="/register" component={Entrance} exact />
            <Route path="/my-created" component={Entrance} />
            <Route path="/test-form/:testId" component={Entrance} />
            <Route path="/my-tests" component={Entrance} />
            <Route path="/test/:testId" component={Entrance} />
            <Route path="/about" component={About} />
            <Route path="/website-information" component={About} />
            <Route path="/profile-sitting" component={Entrance} />
            <Route component={NotFound} />
           </Switch>
           <Footer />
        </div>
    )
}
