import React from 'react'
import defaultProfileImage from '@img/profile.png'
import style from './style.scss'

const ProfileImage = ({data}) => (
    <div className={style.profileImageCanvas}>
        {data.image ? <span className={style.profileImageElement} style={{backgroundImage: `url(${data.image})`}} /> :
        <img className={style.profileImageElement} src={defaultProfileImage} alt={`Photo de ${data.firstName} ${data.lastName}`} />}
    </div>
)

export default ProfileImage