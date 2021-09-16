import React from 'react'
import warning from '@img/warning.svg'
import { ProfileImageInput } from '@js/components/Form/Input'
import { Textarea } from '@js/components/Form/Input'
import { Input } from '@js/components/Form/Input'
import style from './style.scss'
import DeleteImageButton from '@js/components/DeleteImageButton'

const SettingsView = ({
    localLoading,
    values,
    passwordValues,
    error,
    handleFile,
    handleChange,
    handlePasswordChange,
    handleSubmit,
    handleDeleteUser,
    handleDeleteImage,
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
                    <div className={style.settingsForm__userImage}>
                        {values.image && <DeleteImageButton handleDeleteImage={handleDeleteImage} />}
                        <ProfileImageInput
                            image={values.image && (typeof values.image === 'string' ? values.image : URL.createObjectURL(values.image))}
                            handleFile={handleFile}
                        />
                        <p>Cliquez sur l'image pour la modifier</p>
                    </div>
                    <div>
                        <Input
                            type="text"
                            name="firstName"
                            label="Prénom :"
                            value={values.firstName}
                            error={error}
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
                            label="E-mail :"
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
                </div>
                <div className={style.settingsForm__buttons}>
                    <button className="btn btn--primary" type="submit" disabled={localLoading === 'userData'}>
                        {localLoading === 'userData' ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                </div>
            </form>
            <form name="userPassword" onSubmit={handleSubmit}>
                <div className={style.settingsForm__inputsDiv}>
                    <div>
                        <Input
                            type="password"
                            name="password"
                            label="Nouveau mot de passe :"
                            value={passwordValues.password}
                            error={error}
                            handleChange={handlePasswordChange}
                        />
                        <Input
                            type="password"
                            name="confirmPassword"
                            label="Confirmez le nouveau mot de passe :"
                            value={passwordValues.confirmPassword}
                            error={error}
                            handleChange={handlePasswordChange}
                        />
                    </div>
                </div>
                <div className={style.settingsForm__buttons}>
                    <button className="btn btn--primary" type="submit" disabled={localLoading === 'userPassword'}>
                        {localLoading === 'userPassword' ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
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