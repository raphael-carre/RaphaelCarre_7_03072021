import React, { useState } from 'react'
import { useFetch } from '@js/utils/hooks'
import PostView from './PostView'

const PostContainer = ({postData, options}) => {
    const isAllowed = localStorage.getItem('isAdmin') || parseInt(localStorage.getItem('userId')) === postData.userId ? true : false

    const [isOpened, setIsOpened] = useState(false)

    const openMenu = () => {
        setIsOpened(!isOpened)
    }

    return (
        <PostView 
            postData={postData}
            options={options}
            openMenu={openMenu}
            isOpened={isOpened}
            isAllowed={isAllowed}
        />
    )
}

export default PostContainer