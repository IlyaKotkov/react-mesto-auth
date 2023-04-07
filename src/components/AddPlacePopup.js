import PopupWithForm from "./PopupWithForm"
import {useState, useEffect} from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleLinkChange = (e) => {
        setLink(e.target.value)
    }

    const handleAddPlaceSubmit = (e) => {
        e.preventDefault()
        onAddPlace({
            name,
            link
        })
    }

    useEffect(() => {
        if (!isOpen) {
            setName('')
            setLink('')
        }
    }, [isOpen])

    return (
        <PopupWithForm
            name="add"
            title="Загрузить изображение"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddPlaceSubmit}
        >
            <input
                name="name"
                id="card-popup-name"
                className="popup__input popup__input_type_name"
                type="text"
                placeholder="Название"
                minLength={2}
                maxLength={30}
                required=""
                onInput={handleNameChange}
                value={name}
            />
            <span className="card-popup-name-error popup__error" />

            <input
                name="link"
                id="card-popup-url"
                className="popup__input popup__input_type_url"
                type="url"
                placeholder="ссылка на картинку"
                required=""
                onInput={handleLinkChange}
                value={link}
            />
            <span className="card-popup-url-error popup__error" />
        </PopupWithForm>
    )
}