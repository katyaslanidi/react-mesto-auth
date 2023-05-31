import React  from 'react';
import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const linkRef = useRef();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: linkRef.current.value
        });
    }

    useEffect(() => {
        if (isOpen) {
            linkRef.current.value = '';
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            name='avatar-edit'
            title='Обновить аватар'
            buttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                ref={linkRef}
                className="popup__input avatar-edit__input"
                id="GET-image-link"
                type="url"
                name="link"
                placeholder="Ссылка"
                required
            />
            <span
                id="GET-image-link-error"
                className="popup__error popup__error_avatar"
            ></span>
        </PopupWithForm>
    );
}
export default EditAvatarPopup;