import React from 'react'
import defaultProfileImage from '@img/profile.png'
import DateHandler from '@js/classes/DateHandler'
import style from './style.scss'

const ProfileHeader = ({userData}) => (
    <div className={style.profileHeader}>
        <div className={style.profileHeader__head}>
            <img src={userData.image || defaultProfileImage} alt={`Photo de ${userData.firstName} ${userData.lastName}`} />
            <div>
                <h3 className={style.profileHeader__userName}>
                    {userData.firstName} {userData.lastName}
                </h3>
                <p className={style.profileHeader__date}>Membre depuis {DateHandler.formatDate(userData.createdAt)}</p>
                {userData.description && <p className={style.profileHeader__description}>{userData.descrition}</p>}
            </div>
        </div>
    </div>
)

export default ProfileHeader