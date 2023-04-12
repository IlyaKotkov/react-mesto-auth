import React from 'react';
import { Route, Routes, Navigate, useNavigate, } from 'react-router-dom';
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from '../utils/Api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register"
import ProtectedRouteElement from './ProtectedRouteElement';
import * as ApiAuth from '../utils/ApiAuth.js';

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({
    "name": '',
    "about": '',
    "avatar": '',
    "_id": '',
    "cohort": ''
  })
  const [cards, setCards] = React.useState([])
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const navigate = useNavigate()
  const [email, setEmail] = React.useState("")

  React.useEffect(() => {
    Promise.all([
      api.getInformation(),
      api.getInitialCards()
    ])
      .then((values) => {
        setCurrentUser(values[0])
        setCards([...values[1]])
      })
      .catch(err => console.log(err))
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const handleUpdateUser = (data) => {
    api.editUserInfo(data).then(updateUser => {
      setCurrentUser(updateUser)
      closeAllPopups()
    })
      .catch(err => console.log(err))
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null)
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
      closeAllPopups()
    })
      .catch(err => console.log(err))
  }

  const handleUpdateAvatar = (data) => {
    api.editAvatar(data).then(updateUser => {
      setCurrentUser(updateUser)
      closeAllPopups()
    })
      .catch(err => console.log(err))
  }

  const handleAddPlace = (data) => {
    api.addCard(data).then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
      .catch(err => console.log(err))
  }

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  React.useEffect(() => {
    tokenCheck();
    }, [])

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
        ApiAuth.getContent(jwt).then((res) => {
          if (res) {
            setEmail(res.data.email)
            setIsLoggedIn(true);
            navigate("/", { replace: true })
          }
        })
    }
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">



        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                isLoggedIn={isLoggedIn}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onExit={handleLogout}
                emailUser={email}
              />

            }
          />
          <Route path="/sign-up"
            element={
              <Register />
            }
          />
          <Route path="/sign-in"
            element={
              <Login
                onLogin={handleLogin}
              />
            }
          />

          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>

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
          onAddPlace={handleAddPlace}
        />

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}