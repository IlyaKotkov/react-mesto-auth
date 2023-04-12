export default function InfoPopup({ onClose }) {
    return (
        <div className={`popup popup_type_info ${'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__closed" onClick={onClose} type="button" aria-label="Закрыть"></button>
                <h3 className="popup__editHeader">Вы успешно зарегистрировались!</h3>
                <form className="popup__form" id="confirmationForm" name="confirmationForm">
                    <button className="popup__submit" type="submit">Да</button>
                </form>
            </div>
        </div>
    )
}