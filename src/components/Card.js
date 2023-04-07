import {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const handleClick = () => {
        onCardClick(card);
    }

    const handleLikeClick = () => {
        onCardLike(card)
    }

    const handleDeleteClick = () => {
        onCardDelete(card)
    }

    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    return (
        <article className="element">
           {isOwn &&<button className="element__deleteButton" onClick={handleDeleteClick} aria-label="удалить" type="button"/>}
            <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
            <div className="element__container">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__likes">
                    <button className={isLiked ? "element__likeButton element__likeButton_active" : "element__likeButton"} onClick={handleLikeClick} type="button" aria-label="Понравилось"></button>
                    <span className="element__likeNumber">{card.likes.length}</span>
                </div>
            </div>
        </article>
    )
}