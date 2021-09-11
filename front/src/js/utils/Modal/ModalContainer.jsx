import React, { useState, useEffect } from 'react'
import ModalView from './ModalView'

const ModalContainer = ({type = 'message', content}) => {

    return (
        <ModalView type={type} content={content} />
    )
}

export default ModalContainer