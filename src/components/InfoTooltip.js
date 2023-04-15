export default function InfoTooltip({ onClose, message }) {
  return (
    <div className={`popup popup_type_info` + (message ? " popup_opened" : "")}>
      <div className="popup__container">
      <button className="popup__closed" onClick={onClose} type="button" aria-label="Закрыть" />
        <p
          className={
            "popup__info-message" +
            (message
                ? message.isSuccess
                ? " popup__info-message_type-confirm"
                : " popup__info-message_type-cancel"
                : ""
            )
          }
        >
          {message ? message.text : " "}
        </p>
      </div>
    </div>
  );

}