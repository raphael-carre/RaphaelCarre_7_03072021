import { LoaderContext } from '@js/utils/context'
import { useModal } from '@js/utils/hooks'
import { useFetch } from '@js/utils/hooks'
import Modal from '@js/utils/Modal'
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ProfileView from './ProfileView'

const ProfileContainer = () => {
    const { id } = useParams()
    const uri = `/posts/user/${id}`

    const { isLoading, data, error } = useFetch(`/users/${id}`)

    const [userData, setUserData] = useState(null)

    const modal = useModal()

    useEffect(() => {
        if (error && !error.key) {
            modal.error(error.statusCode && error.statusCode !== 500 ? error.message : 'Il y a eu un problème')
        }
    }, [error])

    const {setShowLoader} = useContext(LoaderContext)

    useEffect(() => {
        setShowLoader(isLoading)
    }, [isLoading])

    useEffect(() => {
        data && setUserData(data)
        data && (document.title = `Groupomania - ${data.firstName} ${data.lastName}`)
    }, [data])

    return (
        <>
            {modal.content && <Modal content={modal.content} type={modal.type} />}
            {userData && <ProfileView uri={uri} userData={userData} />}
        </>
    )
}

export default ProfileContainer