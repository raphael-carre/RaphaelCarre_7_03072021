import { LoaderContext } from '@js/utils/context'
import React, { useContext, useEffect } from 'react'
import ProfileView from './ProfileView'

const ProfileContainer = () => {
    const id = localStorage.getItem('userId')
    const uri = `/posts/user/${id}`
    const userData = JSON.parse(localStorage.getItem('userData'))

    const {setShowLoader} = useContext(LoaderContext)

    useEffect(() => {
        setShowLoader(true)
    }, [])

    return <ProfileView uri={uri} userData={userData} />
}

export default ProfileContainer