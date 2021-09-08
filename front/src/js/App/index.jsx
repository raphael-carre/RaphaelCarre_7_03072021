import { hot } from 'react-hot-loader/root'
import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ProtectedRoute from '@js/components/ProtectedRoute'
import { AuthContext } from '@js/utils/context'
import { Header } from '@js/layout/Header'
import { Login } from '@js/pages/Login'
import Thread from '@js/pages/Thread'
import { Temp } from '@js/pages/Temp'
import { Footer } from '@js/layout/Footer'
import { Profile } from '@js/pages/Profile'

const App = () => {
    const { isAuthenticated } = useContext(AuthContext)

    return (
        <Router>
            <Header />
            <Switch>
                {/* <ProtectedRoute exact path="/" component={() => <Temp uri="/posts" />} /> */}
                <ProtectedRoute exact path="/" component={() => <Thread />} />
                <ProtectedRoute path="/profile/:id" component={() => <Profile />} />
                <ProtectedRoute path="/users" component={() => <Temp uri="/users" />} />
                <Route path="/login" component={Login} />
                <Route path="*" render={() => <p>404 page introuvable</p>} />
            </Switch> 
            {isAuthenticated && <Footer />}
        </Router>
    )
}

export default hot(App)
