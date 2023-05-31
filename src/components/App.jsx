import React from 'react';
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api.js';
import auth from '../utils/auth.js';

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [isAuthOk, setIsAuthOk] = useState(false);
  const [isInfoToolTipOpened, setIsInfoToolTipOpened] = useState(false);


  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)); //новый массив с карточками у которых другой id
      })
      .catch((err) => console.log(err));
  }

  const handleUpdateUser = (data) => {
    api.editUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleUpdateAvatar = (avatar) => {
    api.editProfileImage(avatar)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleAddCard = (data) => {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    auth.checkToken(token)
      .then((res) => {
        setIsLoggedIn(true);
        setUserEmail(res.data.email);
        navigate('/');
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err);
      });
  }, []);

  const handleRegister = (email, password) => {
    auth.register(email, password)
      .then(() => {
        setIsAuthOk(true);
        navigate('/sing-in');
      })
      .catch((err) => {
        console.log(err);
        setIsInfoToolTipOpened(true);
      });
  }

  const handleAuthorize = (email, password) => {
    auth.authorize(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setUserEmail(email);
        navigate('/');
        localStorage.setItem('token', res.token);
      })
      .catch((err) => console.log(err));
  }

  const handleSingOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  }

  if (isLoggedIn === null) {
    return;
  }

  // const handleRegister = ({ email, password }) => {
  //   return auth.register(email, password)
  //     .then((res) => {
  //       if (res) {
  //         setIsAuthOk(true);
  //         navigate('/sing-in');
  //       }
  //     })
  //     .catch(err => {
  //       setIsAuthOk(false);
  //       console.log(`Произошла ошибка: ${err}`)
  //     })
  //     .finally(() => setIsInfoToolTipOpened(true));
  // }

  // const handleAuthorize = ({ password, email }) => {
  //   return auth.authorize(email, password).then((res) => {
  //     console.log(res);
  //     if (res.token) {
  //       setUserEmail(email);
  //       console.log(userEmail);
  //       console.log(email);
  //       setIsLoggedIn(true);
  //       localStorage.setItem('jwt', res.token);
  //       navigate('/');

  //     }
  //   })
  // }

  // const handleSingOut = () => {
  //   localStorage.removeItem('jwt');
  //   setIsLoggedIn(false);
  //   navigate('/sing-in');
  // }

  // // const tokenCheck = () => {
  // //   const jwt = localStorage.getItem('jwt');
  // //   if (jwt) {
  // //     auth.checkToken(jwt)
  // //       .then(res => {
  // //         setIsLoggedIn(true);
  // //         setUserEmail(res.data.email);
  // //         navigate('/');
  // //       })
  // //       .catch(err => console.log(err));
  // //   }
  // // }

  // // useEffect(() => {
  // //   tokenCheck();
  // // }, [])

  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  }
  const handleAddPlaceClick = () => {
    setAddPlacePopup(true);
  }
  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setEditAvatarPopup(false);
    setSelectedCard({});
  }

  useEffect(() => {
    const handleEscapeKey = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    const handleOverlayClick = (evt) => {
      if (evt.target.classList.contains('overlay_opened')
        || evt.target.classList.contains('close-button')) {
        closeAllPopups();
      }
    }

    document.addEventListener('mousedown', handleOverlayClick);

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  })

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header
          userEmail={userEmail}
          handleSingOut={handleSingOut}
        />
        <Routes>
          <Route
            path="/sing-up"
            element={
              <div>
                <Register
                  isLoggedIn={setIsLoggedIn}
                  handleRegister={handleRegister}
                />
              </div>
            }
          />
          <Route
            path="/sing-in"
            element={
              <div>
                <Login
                  isLoggedIn={setIsLoggedIn}
                  handleAuthorize={handleAuthorize}
                />
              </div>
            }
          />
          <Route
            path="*"
            element={isLoggedIn ? <Navigate to='/' /> : <Navigate to='/sing-up' />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />

        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
        />

        <PopupWithForm
          name='card-delete'
          title='Вы уверенны?'
          buttonText='Да'
          onClose={closeAllPopups}
        ></PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        ></ImagePopup>

        <InfoTooltip
          name={"tool-tip"}
          isOpen={isInfoToolTipOpened}
          onClose={closeAllPopups}
          isAuthOk={isAuthOk}
        />

      </div>
    </CurrentUserContext.Provider>
    // </Routes>
  );
}

export default App;
