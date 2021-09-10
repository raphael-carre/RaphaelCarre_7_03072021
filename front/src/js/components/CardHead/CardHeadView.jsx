import React from 'react'
import pencil from '@img/pencil.svg'
import DateHandler from '@js/utils/classes/DateHandler'
import { Link } from 'react-router-dom'
import { EditionMenu } from '../EditionMenu'
import ProfileImage from '../ProfileImage'
import style from './style.scss'

const CardHeadView = ({data, options, openMenu, isOpened, isAllowed}) => (
    <>
        {isAllowed &&
        <img src={pencil} alt="Interagir" className={style.cardHead__interact} onClick={openMenu} />}
        {isAllowed && isOpened &&
        <EditionMenu options={options} id={data.id} openMenu={openMenu} isOpened={isOpened} />}

        <div className={style.cardHead__head}>
            <Link to={`/profile/${data.userId}`}>
                <ProfileImage data={data.User} />
            </Link>
            <div>
                <h3 className={style.cardHead__userName}>
                    <Link to={`/profile/${data.userId}`}>
                        {data.User.firstName} {data.User.lastName}
                    </Link>
                </h3>
                <p className={style.cardHead__date}>Publié {DateHandler.formatDateTime(data.createdAt)}</p>
            </div>
        </div>
    </>
)

export default CardHeadView