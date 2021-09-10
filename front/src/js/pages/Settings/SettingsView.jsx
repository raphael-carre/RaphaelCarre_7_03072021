import React from 'react'
import warning from '@img/warning.svg'
import { ProfileImageInput } from '@js/components/Form/Input'
import { Textarea } from '@js/components/Form/Input'
import { Input } from '@js/components/Form/Input'
import style from './style.scss'

const SettingsView = ({
    values,
    passwordValues,
    error,
    handleFile,
    handleChange,
    handlePasswordChange,
    handleSubmit,
    handleDeleteUser,
    logout
}) => (
    <section>
        <div className={style.settingsForm}>
            <div>
                <button className="btn btn--primary" onClick={logout}>Déconnexion</button>
            </div>
            <form name="userData" onSubmit={handleSubmit}>
                <h2 className={style.settingsForm__title}>Informations du compte</h2>
                <div className={style.settingsForm__inputsDiv}>
                    <ProfileImageInput
                        image={values.image && (typeof values.image === 'string' ? values.image : URL.createObjectURL(values.image))}
                        handleFile={handleFile}
                    />
                    <p>Cliquez sur l'image pour la modifier</p>
                    <Input
                        type="text"
                        name="firstName"
                        label="Prénom :"
                        value={values.firstName}
                        handleChange={handleChange}
                    />
                    <Input
                        type="text"
                        name="lastName"
                        label="Nom :"
                        value={values.lastName}
                        error={error}
                        handleChange={handleChange}
                    />
                    <Input
                        type="email"
                        name="email"
                        email="E-mail :"
                        value={values.email}
                        error={error}
                        handleChange={handleChange}
                    />
                    <Textarea
                        name="description"
                        label="Description :"
                        value={values.description}
                        error={error}
                        handleChange={handleChange}
                    />
                </div>
                <div className={style.settingsForm__buttons}>
                    <button className="btn btn--primary" type="submit">Enregistrer</button>
                </div>
            </form>
            <form name="userPassword" onSubmit={handleSubmit}>
                <div className={style.settingsForm__inputsDiv}>
                    <Input
                        type="password"
                        name="password"
                        label="Mot de passe actuel :"
                        value={passwordValues.password}
                        error={error}
                        handleChange={handlePasswordChange}
                    />
                    <Input
                        type="password"
                        name="newPassword"
                        label="Nouveau mot de passe :"
                        value={passwordValues.newPassword}
                        error={error}
                        handleChange={handlePasswordChange}
                    />
                    <Input
                        type="password"
                        name="confirmNewPassword"
                        label="Confirmez le nouveau mot de passe :"
                        value={passwordValues.confirmNewPassword}
                        error={error}
                        handleChange={handlePasswordChange}
                    />
                </div>
                <div className={style.settingsForm__buttons}>
                    <button className="btn btn--primary" type="submit">Enregistrer</button>
                </div>
            </form>
            <div className={style.settingsForm__profileDeletion}>
                <img src={warning} alt="Danger" />
                <button className="btn btn--alert" onClick={handleDeleteUser}>Supprimer mon compte</button>
            </div>
        </div>
        
    </section>
)

export default SettingsView