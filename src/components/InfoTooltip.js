import React from "react";

export default function InfoTooltip({ onClose, message, isOpen }) {

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

  let messageClassName = "popup__info-message" 
  if (message) {
    messageClassName += message.isSuccess ? " popup__info-message_type-confirm" : " popup__info-message_type-cancel"
  }

  return (
    <div className={`popup popup_type_info` + (message ? " popup_opened" : "")}>
      <div className="popup__container">
      <button className="popup__closed" onClick={onClose} type="button" aria-label="Закрыть" />
        <p className={messageClassName}>
          {message ? message.text : " "}
        </p>
      </div>
    </div>
  );
}