export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
      <figure className="popup__image-container">
        <button className="popup__closed" onClick={onClose} type="button" aria-label="Закрыть" />
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <figcaption className="popup__signature">{card?.name}</figcaption>
      </figure>
    </div>
  )
}