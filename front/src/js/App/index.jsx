import { hot } from 'react-hot-loader/root'
import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ProtectedRoute from '@js/components/ProtectedRoute'
import { AuthContext } from '@js/utils/context'
import { Header } from '@js/layout/Header'
import { Login } from '@js/pages/Login'
import { Register } from '@js/pages/Register'
import Thread from '@js/pages/Thread'
import { Profile } from '@js/pages/Profile'
import { Footer } from '@js/layout/Footer'
import { Settings } from '@js/pages/Settings'
import { LoaderProvider } from '@js/utils/context'
import Error404 from '@js/pages/Error404'

const App = () => {
    const { isAuthenticated } = useContext(AuthContext)

    return (
        <Router>
            <Header isAuthenticated={isAuthenticated} />
            {/* <LoaderProvider> */}
                <Switch>
                    <ProtectedRoute exact path="/" component={() => <Thread />} />
                    <ProtectedRoute path="/profile/:id" component={() => <Profile />} />
                    <ProtectedRoute path="/settings" component={() => <Settings />} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="*" render={Error404} />
                </Switch> 
            {/* </LoaderProvider> */}
            {isAuthenticated && <Footer />}
        </Router>
    )
}

export default hot(App)
