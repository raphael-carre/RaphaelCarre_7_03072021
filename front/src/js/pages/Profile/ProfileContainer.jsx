import { LoaderContext } from '@js/utils/context'
import { useFetch } from '@js/utils/hooks'
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ProfileView from './ProfileView'

const ProfileContainer = () => {
    const { id } = useParams()
    const uri = `/posts/user/${id}`

    const { isLoading, data, error } = useFetch(`/users/${id}`)

    const [userData, setUserData] = useState(null)

    const {setShowLoader} = useContext(LoaderContext)

    useEffect(() => {
        setShowLoader(isLoading)
    }, [isLoading])

    useEffect(() => {
        data && setUserData(data)
        data && (document.title = `Groupomania - ${data.firstName} ${data.lastName}`)
    }, [data])

    return (
        (error ? <p>{error.message}</p>:
            userData && <ProfileView uri={uri} userData={userData} />
        )
    )
}

export default ProfileContainer