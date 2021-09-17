import { Input } from '@js/components/Form/Input'
import React from 'react'
import { Link } from 'react-router-dom'
import style from './style.scss'

const LostPasswordView = ({values,passwordValues, handleChange, handlePasswordChange, handleSubmit, error}) => (
    <section>
        <h2 className={style.lostPasswordForm__title}>Mot de passe oublié</h2>
        {!values.verified && 
        <>
            <div>
                <form name="sendCode" onSubmit={handleSubmit}>
                    <div className={style.lostPasswordForm__inputsDiv}>
                        <Input
                            type="email"
                            name="email"
                            label="Merci de renseigner votre adresse e-mail :"
                            value={values.email}
                            handleChange={handleChange}
                            error={error}
                        />
                    </div>
                    <div className={style.lostPasswordForm__buttons}>
                        <button type="submit" className="btn btn--primary">{values.sent ? 'Renvoyer un code' : 'Valider'}</button>
                    </div>
                </form>
            </div>
            {values.sent &&
            <div>
                <form name="checkCode" onSubmit={handleSubmit}>
                    <div className={style.lostPasswordForm__inputsDiv}>
                        <Input
                            type="text"
                            name="code"
                            label="Veuillez saisir le code que vous avez reçu à votre adresse e-mail :"
                            value={values.code}
                            handleChange={handleChange}
                            error={error}
                        />
                    </div>
                    <div className={style.lostPasswordForm__buttons}>
                        <button type="submit" className="btn btn--primary">Vérifier</button>    
                    </div> 
                </form>
            </div>}
        </>}
        {values.verified &&
        <div>
            <form name="sendNewPassword" onSubmit={handleSubmit}>
                <div className={style.lostPasswordForm__inputsDiv}>
                    <Input
                        type="password"
                        name="password"
                        label="Nouveau mot de passe :"
                        value={passwordValues.password}
                        handleChange={handlePasswordChange}
                        error={error}
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        label="Confirmez le mot de passe :"
                        value={passwordValues.confirmPassword}
                        handleChange={handlePasswordChange}
                        error={error}
                    />
                </div>
                <div className={style.lostPasswordForm__buttons}>
                    <button type="submit" className="btn btn--primary">Envoyer</button>
                </div>
            </form>
        </div>}
        <p className={style.lostPasswordP}>
            <Link to="/login" title="Revenir à la page de connexion">Revenir à la page de connexion</Link>
        </p>
    </section>
)

export default LostPasswordView