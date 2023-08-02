import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main";
import Footer from "./Footer";

import AddPlacePopup from "./AddPlacePopup";
import PopupDeleteCard from "./PopupDeleteCard";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";

import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";

import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";

function App() {
  const navigate = useNavigate();

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPopupDeleteCardOpen, setIsPopupDeleteCardOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipMessage, setIsInfoTooltipMessage] = useState("");

  const [selectedCard, setSelectedCard] = useState({});
  const [deletedCard, setDeletedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const [email, setEmail] = useState("");
  const [cards, setCards] = useState([]);

  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const isModalWindowOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isPopupDeleteCardOpen || selectedCard.link;

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPopupDeleteCardOpen(false);
    setIsInfoTooltipOpen(false);
    setDeletedCard({});
    setSelectedCard({});
  }

  function closeByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      console.log("asd");
      closeAllPopups();
    }
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isModalWindowOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isModalWindowOpen]);
 
  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token && !loggedIn) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    tokenCheck();
    loggedIn &&
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userRes, cards]) => {
          setCurrentUser(userRes);
          setCards(cards.data.reverse());
        })
        .catch((err) => console.log(err));
  }, [loggedIn, tokenCheck]);


  function handleLogin(userData) {
    auth
      .login(userData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          setEmail(userData.email);
          navigate("/main", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccess(false);
        handleSignup("Что-то пошло не так! Попробуйте еще раз.");
      });
  }

  function handleRegister(regUserData) {
    auth
      .register(regUserData)
      .then(() => {
        navigate("/sign-in", { replace: true });
        setIsRegistrationSuccess(true);
        handleSignup("Вы успешно зарегистрировались!");
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccess(false);
        handleSignup("Что-то пошло не так! Попробуйте еще раз.");
      });
  }

  function handleSignup(message) {
    setIsInfoTooltipMessage(message);
    setIsInfoTooltipOpen(true);
  }

  function handleSignout() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api
      .updateProfileUserAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api
      .patchUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .postCard(data)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
        console.log(cards);
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false));
  }

  function handleCardDelete(card) {
      setIsLoading(true);
      api
        .deleteCard(card._id)
        .then(() => {
          setCards((state) => state.filter((item) => item._id !== card._id));
          closeAllPopups();
        })
        .catch((error) => console.log(`Ошибка: ${error}`))
        .finally(() => setIsLoading(false));
    }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user === currentUser._id);
    (isLiked ? api.deleteLike(card._id) : api.putLike(card._id, true))
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === newCard.data._id ? newCard.data : c))
        );
      })
      .catch((err) => console.log(err));
  }

  

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/main" replace />
                ) : (
                  <Navigate to="/sign-up" replace />
                )
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login onLogin={handleLogin} title="Вход" buttonText="Войти" />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  onRegister={handleRegister}
                  title="Регистрация"
                  buttonText="Зарегистрироваться"
                />
              }
            />
            <Route
              path="/main"
              element={
                <ProtectedRoute
                  element={Main}
                  onEditProfile={setIsEditProfilePopupOpen}
                  onEditAvatar={setIsEditAvatarPopupOpen}
                  onAddPlace={setIsAddPlacePopupOpen}
                  onPopupDeleteCard={setIsPopupDeleteCardOpen}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike}
                  onDeletedCard={setDeletedCard}
                  cards={cards}
                  loggedIn={loggedIn}
                  email={email}
                  onSignout={handleSignout}
                />
              }
            />
          </Routes>

          <Footer />
          <EditProfilePopup
            isModalWindowOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
            onLoading={isLoading}
            onCloseOverlay={closeByOverlay}
          />

          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isModalWindowOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onLoading={isLoading}
            onCloseOverlay={closeByOverlay}
          />

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isModalWindowOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onLoading={isLoading}
            onCloseOverlay={closeByOverlay}
          />

          <PopupDeleteCard
            onClose={closeAllPopups}
            isModalWindowOpen={isPopupDeleteCardOpen}
            onCardDelete={handleCardDelete}
            onLoading={isLoading}
            card={deletedCard}
            onCloseOverlay={closeByOverlay}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlay}
          />
          
          <InfoTooltip
            isModalWindowOpen={isInfoTooltipOpen}
            message={isInfoTooltipMessage}
            isSuccess={isRegistrationSuccess}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlay}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
