import React from 'react'
import ProfileHeader from '@js/components/ProfileHeader'
import { Posts } from '@js/components/Posts'

const ProfileView = ({uri, userData}) => (
    <section>
        <ProfileHeader userData={userData} />
        <Posts uri={uri} userId={userData.id} />
    </section>
)

export default ProfileView