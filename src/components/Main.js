import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import Header from './Header';
import Footer from './Footer';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, onExit, emailUser }) {

  const currentUser = useContext(CurrentUserContext)

  const navigate = useNavigate()
  function signOut(){
    localStorage.removeItem('jwt');
    navigate('/signin', {replace: true});
    onExit()
  }

  return (
    <>
    <Header>
      <div className='header__container'>
      <p className='profile__emailUser'>{ emailUser }</p>
      <button onClick={signOut} className='profile__exitButton'>Выйти</button>
      </div>
    </Header>
    <main className="page__container">
      <section className="profile">
        <div className="profile__container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
          <button
            className="profile__editAvatarButton"
            type="button"
            onClick={onEditAvatar}
          />
          <div className="profile__info">
            <h1 className="profile__name" >{currentUser.name}</h1>
            <button
              className="profile__editButton"
              type="button"
              onClick={onEditProfile}
              aria-label="Редактировать"
            />
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__addButton"
          type="button"
          onClick={onAddPlace}
          aria-label="Добавить"
        />
      </section>

      <section className="elements">
        {
          cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
          ))
        }
      </section>
    </main>
    <Footer />
    </>
  )
}
export default Main