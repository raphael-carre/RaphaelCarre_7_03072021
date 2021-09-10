import React from 'react'
import DateHandler from '@js/utils/classes/DateHandler'
import ProfileImage from '../ProfileImage'
import style from './style.scss'

const ProfileHeader = ({userData}) => (
    <div className={style.profileHeader}>
        <div className={style.profileHeader__head}>
            <ProfileImage data={userData} />
            <div>
                <h3 className={style.profileHeader__userName}>
                    {userData.firstName} {userData.lastName}
                </h3>
                <p className={style.profileHeader__date}>Membre depuis {DateHandler.formatDate(userData.createdAt, false)}</p>
                {userData.description && <p className={style.profileHeader__description}>{userData.description}</p>}
            </div>
        </div>
    </div>
)

export default ProfileHeader