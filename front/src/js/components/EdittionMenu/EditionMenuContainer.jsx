import React from 'react'
import EditionMenuView from './EditionMenuView'

const EditionMenuContainer = ({openMenu, options, id}) => {

    return <EditionMenuView openMenu={openMenu} options={options} id={id} />
}

export default EditionMenuContainer