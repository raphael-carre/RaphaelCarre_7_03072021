import React from 'react'
import { Posts } from '@js/components/Posts'

const Thread = () => {
    document.title = "Groupomania"
    
    return (
        <section>
            <Posts uri="/posts" />
        </section>
    )
}

export default Thread