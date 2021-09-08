import { useFetch } from '@js/utils/hooks'
import Loader from '@js/utils/Loader'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProfileView from './ProfileView'

const ProfileContainer = () => {
    const { id } = useParams()
    const uri = `/posts/user/${id}`

    const { isLoading, data, error } = useFetch(`/users/${id}`)

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        data && setUserData(data)
    }, [data])

    return (
        isLoading ? <Loader /> :
        (error ? <p>{error.message}</p>:
            userData && <ProfileView uri={uri} userData={userData} />
        )
    )
}

export default ProfileContainer