import React  from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`overlay card-popup ${card.name && "overlay_opened"}`}>
      <div className="card-popup__card">
        <button
          className="card-popup__close close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="card-popup__image"
          src={card.link}
          alt={card.name}
        />
        <h2 className="card-popup__text">{card.name}</h2>
      </div>
    </div>
  );
}
export default ImagePopup;