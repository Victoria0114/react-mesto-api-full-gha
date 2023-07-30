import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";

import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";

import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { authorization, register, checkToken } from "../utils/auth";

export default function App() {
  const navigate = useNavigate();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({
    name: " ",
    about: " ",
    avatar: " ",
    _id: " ",
  });
  const [cards, setCards] = useState([]);
  const [registrated, setRegistrated] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("email@yandex.ru");
  const [authorizationData, setAuthorizationData] = useState({
    password: "",
    email: "",
  });
  
  const isModalWindowOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link || isInfoTooltipOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    
    if(isModalWindowOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isModalWindowOpen])

  // useEffect(() => {
  //   function handleOverlay(evt) {
  //     if (evt.target === evt.currentTarget) {
  //       console.log('click')
  //       closeAllPopups()
  //     }
  //   }
    
  //   if(isModalWindowOpen) {
  //     document.addEventListener('click', handleOverlay);
  //     return () => {
  //       document.removeEventListener('click', handleOverlay);
  //     }
  //   }
  // }, [isModalWindowOpen])

  useEffect(() => {
    tokenCheck();
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      console.log('1234567')
      closeAllPopups()
    }
  }

  const logOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate('/sign-in');
  }
  
  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    checkToken(jwt).then((response) => {
      setUserEmail(response.data.email);
      setLoggedIn(true);      
    }).then(() => navigate("/"))
    .catch((err) => console.error(err));
  }

  const handleRegister = () => {
    setRegistrated(false);
    const { password, email } = authorizationData;
    register(password, email)
      .then((response) => {
        if (response.data.email) {
          setRegistrated(true);
          navigate("/sign-in");
        }
      })
      .then(() => {
        setAuthorizationData({ password: "", email: "" });
      })
      .catch((err) => console.error(err))
      .finally(() => setIsInfoTooltipOpen(true));
  };

  const handleLogin = () => {
    const { password, email } = authorizationData;
    authorization(password, email)
      .then((response) => {
        if (response.token) {
          localStorage.setItem("jwt", response.token);
          setUserEmail(email);
          setLoggedIn(true);
          navigate("/");
        }
      })
      .then(() => {
        setAuthorizationData({ password: "", email: "" });
      })
      .catch((err) => console.error(err));
  };
  //
  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
 
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleUpdateUser = (user) => {
    api
      .patchUserInfo(user)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error));
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .patchAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error));
  };

  const handleAddPlaceSubmit = (card) => {
    api
      .postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error));
  };
  //
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsInfoTooltipOpen(false);
  }
  
  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setAuthorizationData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };
  //
  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route 
              path="/sign-up" 
              element={
                <Register 
                  onRegister={handleRegister}
                  passowrdInput={authorizationData.password}
                  emailInput={authorizationData.email}
                  handleChangeInput={handleChangeInput}
                />
              } 
            />
            <Route 
              path="/sign-in" 
              element={
                <Login 
                  onLogin={handleLogin}
                  passowrdInput={authorizationData.password}
                  emailInput={authorizationData.email}
                  handleChangeInput={handleChangeInput}
                />
              } 
            />
            <Route path="/" element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route 
              path="/" 
              element={
                <>
                  <Header
                    link={"/sign-in"}
                    userEmail={userEmail}
                    linkText={"Выход"}
                    onSignOut={logOut}
                  />
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                  />
                </>
              } 
            /></Route>
          </Routes>
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onCloseOverlay={handleOverlay}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onCloseOverlay={handleOverlay}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onCloseOverlay={handleOverlay}
          />

          <PopupWithForm
            name="delete-card"
            title="Вы уверены?"
            buttonText="Да"
            isOpen={false}
            onClose={closeAllPopups}
            onCloseOverlay={handleOverlay}
          />

          <ImagePopup 
            card={selectedCard} 
            onClose={closeAllPopups} 
            onCloseOverlay={handleOverlay}
          />
          
          <InfoTooltip
            name="info"
            containerType="infoTooltip"
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            onCloseOverlay={handleOverlay}
            isOk={registrated}
          />

        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}
