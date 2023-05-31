import React  from 'react';
import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const nameRef = useRef();
  const urlRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({
      name: nameRef.current.value,
      link: urlRef.current.value
    })
  }

  useEffect(() => {
    if (isOpen) {
      nameRef.current.value = '';
      urlRef.current.value = '';
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      buttonText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={nameRef}
        className="popup__input popup__input_title"
        id="GET-title"
        type="text"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span
        id="GET-title-error"
        className="popup__error popup__error_title"
      ></span>
      <input
        ref={urlRef}
        className="popup__input popup__input_url"
        id="GET-url"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span
        id="GET-url-error"
        className="popup__error popup__error_url"
      ></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;