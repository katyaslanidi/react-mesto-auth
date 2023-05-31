import React  from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `element__like ${isLiked && 'element__liked'}`
    );;

    const handlePhotoClick = () => {
        onCardClick(card);
    }

    const handleLikeClick = () => {
        onCardLike(card);
    }

    const handleDeleteClick = () => {
        onCardDelete(card);
    }

    return (
        <div className="element">
            {isOwn && <button className="element__delete" onClick={handleDeleteClick} type="button"></button>}
            <img
                className="element__image"
                src={card.link}
                alt={card.name}
                onClick={handlePhotoClick}
            />
            <div className="element__bottom">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__like-box">
                    <button
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}
                        type="button"
                    ></button>
                    <span className="element__like-counter">{card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;