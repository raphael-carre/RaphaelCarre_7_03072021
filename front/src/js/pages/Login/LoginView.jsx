import React from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@js/components/Form/Input'
import style from './style.scss'

const LoginView = ({handleSubmit, error, values, handleChange}) => (
    <section>
        <form onSubmit={handleSubmit} className={style.connectionForm}>
            <h2 className={style.connectionForm__title}>Connexion</h2>
            <div className={style.connectionForm__inputsDiv}>
                <Input
                    type='email'
                    name='email'
                    label='E-mail :'
                    placeholder='john.doe@gmail.com'
                    error={error}
                    value={values.email}
                    handleChange={handleChange}
                />
                <Input
                    type='password'
                    name='password'
                    label='Mot de passe :'
                    error={error}
                    value={values.password}
                    handleChange={handleChange}
                />
            </div>
            <div className={style.connectionForm__buttons}>
                <button type="submit">Se connecter</button>
            </div>
        </form>
        <p className={style.loginP}><Link to="/lostpassword">Mot de passe perdu</Link></p>
        <p className={style.loginP}>Vous n'avez pas de compte ?<br /><Link to="/register">Inscrivez-vous</Link> dès maintenant !</p>
    </section>
)

export default LoginView