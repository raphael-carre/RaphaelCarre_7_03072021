import Request from '@js/utils/classes/Request'
import { useModal } from '@js/utils/hooks'
import Modal from '@js/utils/Modal'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileView from './ProfileView'

const ProfileContainer = () => {
    const { id } = useParams()
    const uri = `/posts/user/${id}`

    const modal = useModal()

    const [error, setError] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        getUserData(id)
    }, [])
    
    useEffect(() => {
        getUserData(id)
    }, [id])

    useEffect(() => {
        if (error && !error.key) {
            modal.error(error.statusCode && error.statusCode !== 500 ? error.message : 'Il y a eu un problème')
            setError(false)
        }
    }, [error])

    const getUserData = async userId => {
        try {
            const response = await Request.apiCall(`/users/${userId}`)

            if (response.error) throw response.data

            setError(false)
            setData(response.data)
        }
        catch (error) { setError(error) }
    }

    return (
        <>
            {modal.content && <Modal content={modal.content} type={modal.type} />}
            {data && <ProfileView uri={uri} userData={data} />}
        </>
    )
}

export default ProfileContainer