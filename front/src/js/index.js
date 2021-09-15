import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { AuthProvider } from '@js/utils/context'
import App from './App'

ReactDOM.render(
    <AppContainer>
        <AuthProvider>
            <App />
        </AuthProvider>
    </AppContainer>,
    document.getElementById('root')
)