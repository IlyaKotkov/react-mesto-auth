import PopupWithForm from "./PopupWithForm"
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
        <input name="name" id="card-popup-name-profile"
          className="popup__input popup__input_type_name"
          type="text"
          placeholder="Имя"
          onChange={handleNameChange}
          value={name}
          required
        />
        <span className="card-popup-name-profile-error popup__error" />

        <input
          name="about"
          id="card-popup-job"
          className="popup__input popup__input_type_job"
          type="text"
          placeholder="Деятельность"
          onChange={handleDescriptionChange}
          value={description}
          required
        />
        <span className="card-popup-job-error popup__error" />
    </PopupWithForm>
  )
}