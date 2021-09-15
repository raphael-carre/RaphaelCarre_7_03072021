import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { AuthProvider } from '@js/utils/context'
import App from './App'
import { LoaderProvider } from './utils/context'

ReactDOM.render(
    <AppContainer>
        <LoaderProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </LoaderProvider>
    </AppContainer>,
    document.getElementById('root')
)