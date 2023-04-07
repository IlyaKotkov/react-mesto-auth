import { useEffect, useRef } from "react"
import PopupWithForm from "./PopupWithForm"

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = useRef()

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(
            avatarRef.current.value
        );
    }

    useEffect(() => {
        if(!isOpen) {
            avatarRef.current.value = ''
        }
    }, [isOpen])

    return (
        <PopupWithForm
            name="editAvatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                ref={avatarRef}
                name="avatarInput"
                id="avatar-popup-url"
                className="popup__input popup__input_type_url"
                type="url"
                placeholder="ссылка на аватар"
                required=""
            />
            <span className="avatar-popup-url-error popup__error" />
        </PopupWithForm>
    )
}