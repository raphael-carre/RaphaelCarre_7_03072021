import { AuthContext } from '@js/utils/context'
import React, { useContext } from 'react'
import NavBarView from './NavBarView'

const NavBarContainer = () => {
    const { setIsAuthenticated } = useContext(AuthContext)

    const logout = () => {
        localStorage.clear()
        setIsAuthenticated(false)
    }

    return <NavBarView logout={logout} />
}

export default NavBarContainer