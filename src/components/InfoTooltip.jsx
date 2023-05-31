import React from "react";
import success from '../images/Success.png';
import error from '../images/Error.png';

function InfoTooltip({ isOpen, onClose, isAuthOk }) {
    return (
        <div className={`overlay ${isOpen ? 'overlay_opened' : ''}`}>
            <div className="popup popup__info">
                <button 
                    className="popup__close" 
                    type="button" 
                    aria-label="Закрыть окно" 
                    onClick={onClose}>
                </button>
                <img 
                    className="popup__icon"
                    src={isAuthOk ? success : error} 
                    alt={isAuthOk ? 'Иконка галочки' : "Иконка крестика"} 
                />
                <h2 className="popup__title">{isAuthOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
            </div>
        </div>
    );
}
export default InfoTooltip;