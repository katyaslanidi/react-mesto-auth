import React  from 'react';
import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <button className="profile__image-edit-button"
                    type="button"
                    onClick={onEditAvatar}></button>
                <img className="profile__image" src={currentUser.avatar} alt="аватар" />
                <div className="profile__info">
                    <div className="profile__text">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <p className="profile__job">{currentUser.about}</p>
                    </div>
                    <button className="profile__edit"
                        type="button"
                        onClick={onEditProfile}></button>
                </div>
                <button className="profile__add"
                    type="button"
                    onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card) => {
                    return (<Card
                        card={card}
                        key={card._id}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />)
                })}
            </section>
        </main>
    );
}
export default Main;