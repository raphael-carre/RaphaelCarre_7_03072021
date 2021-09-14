import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { AuthProvider, ModalProvider } from '@js/utils/context'
import App from './App'

ReactDOM.render(
    <AppContainer>
        <ModalProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ModalProvider>
    </AppContainer>,
    document.getElementById('root')
)