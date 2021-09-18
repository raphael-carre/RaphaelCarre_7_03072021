import { useState, useEffect, useRef } from "react"

export const useModal = () => {
    const [content, setContent] = useState(null)
    const [type, setType] = useState('message')

    const resolver = useRef()

    useEffect(() => {
        if (content && type !== 'confirm') {
            const timeout = setTimeout(() => {
                setContent(null)
                setType('message')
                document.body.removeAttribute('style')
                clearTimeout(timeout)
            }, 2200)
        }
    })

    useEffect(() => {
        if (content) {
            document.body.style.overflow = 'hidden'
            
            if (type === 'confirm') {
                const activeElement = document.activeElement
                focusTrap()

                return () => { activeElement.focus() }
            }
        }
    }, [content])

    const info = message => {
        setContent(message)
        setType('message')
    }

    const error = message => {
        setContent(message)
        setType('error')
    }

    const confirm = message => {
        setContent(message)
        setType('confirm')

        return new Promise(resolve => {
            resolver.current = resolve
        })
    }

    const handleOk = () => {
        resolver.current && resolver.current(true)
        closeModal()
    }

    const handleNo = () => {
        resolver.current && resolver.current(false)
        closeModal()
    }

    const closeModal = () => {
        const timout = setTimeout(() => {
            setContent(null)
            setType('message')
            document.body.removeAttribute('style')
            clearTimeout(timout)
        }, 220)   
    }

    const focusTrap = () => {
        const modal = document.getElementById('modal')
        const focusableElements = document.querySelectorAll('#modal button')

        for (let i = 0; i < focusableElements.length; i++) {
            focusableElements[i].index = i
        }
        
        focusableElements[0].focus()

        modal.addEventListener('keydown', e => {
            if (e.key === 'Tab') {
                e.preventDefault()
                for (let i = 0; i < focusableElements.length; i++) {
                    if (focusableElements[i] === e.target) {
                        if (focusableElements[i].index === focusableElements.length - 1) {
                            focusableElements[i - 1].focus()
                        } else {
                            focusableElements[i + 1].focus()
                        }
                    }
                }
            }
        })
    }

    const confirmMethods = { handleOk, handleNo }

    return { info, error, confirm, content, type, confirmMethods }
}