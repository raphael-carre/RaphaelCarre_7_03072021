import React from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@js/components/Form/Input'
import thankyou from '@img/thankyou.svg'
import style from './style.scss'

const RegisterView = ({isRegistered, error, values, handleChange, register, disabled}) => (
    <section>
        {isRegistered ?
        <section>
            <p className={style.registerP}>
                <img src={thankyou} alt="Pouce en l'air" />
            </p>
            <p className={style.registerP}>Merci de vous être enregistré !</p>
            <p className={style.registerP}>
                <Link to="/login">Revenir à la page de connexion</Link>
            </p>
        </section> :
        <form className={style.registerForm} onSubmit={register}>
            <h2 className={style.registerForm__title}>Inscription</h2>
            <p className={style.registerP}>Veuillez saisir vos informations</p>
            <div className={style.registerForm__inputsDiv}>
                <Input
                    type="text"
                    name="firstName"
                    label="Prénom "
                    placeholder="John"
                    error={error}
                    value={values.firstName}
                    handleChange={handleChange}
                />
                <Input
                    type="text"
                    name="lastName"
                    label="Nom :"
                    placeholder="Doe"
                    error={error}
                    value={values.lastName}
                    handleChange={handleChange}
                />
                <Input
                    type="email"
                    name="email"
                    label="E-mail :"
                    placeholder="john.doe@gmail.com"
                    error={error}
                    value={values.email}
                    handleChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    label="Mot de passe :"
                    error={error}
                    value={values.password}
                    handleChange={handleChange}
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    label="Confirmez votre mot de passe :"
                    error={error}
                    value={values.confirmPassword}
                    handleChange={handleChange}
                />
                <div className={style.registerForm__buttons}>
                    <button type="submit" disabled={disabled}>Inscription</button>
                </div>
            </div>
        </form>}
    </section>
)

export default RegisterView