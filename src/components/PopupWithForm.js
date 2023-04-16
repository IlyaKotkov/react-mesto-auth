import React from "react";

function PopupWithForm({ title, name, isOpen, onClose, children, onSubmit, submit }) {

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  return (
    <div className={`popup${isOpen ? ' popup popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__closed" type="button" onClick={onClose} />
        <h2 className="popup__editHeader">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <div className="popup__edit">
            <label className="popup__label">
              {children}
            </label>
          </div>
          <button className="popup__submit" type="submit">
            {submit || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm