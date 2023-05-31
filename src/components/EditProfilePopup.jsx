import React  from 'react';
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const handleSetName = (evt) => {
        setName(evt.target.value);
    }

    const handleSetDescription = (evt) => {
        setDescription(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            buttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_name"
                id="GET-name"
                type="text"
                value={name || ''}
                onChange={handleSetName}
                name="name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
            />
            <span
                id="GET-name-error"
                className="popup__error popup__error_name"
            ></span>
            <input
                className="popup__input popup__input_job"
                id="GET-about"
                type="text"
                value={description || ''}
                onChange={handleSetDescription}
                name="about"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required
            />
            <span
                id="GET-about-error"
                className="popup__error popup__error_job"
            ></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup;