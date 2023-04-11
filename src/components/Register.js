import Header from "./Header";

import { Link, useNavigate } from "react-router-dom";

import * as ApiAuth from '../utils/ApiAuth.js';
import { useState } from "react";

export default function Register() {

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate();

  function handleChange(e) {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if(formValue.password) {
      const {email, password} = formValue;
      ApiAuth.Register(email,password).then((res) => {
        navigate('/Login', {replace: true})
      })
    }
  }

return (
    <>
    <Header>
      
        <Link to="/sign-in" className="header__menu">Войти</Link>
        
    </Header>

    <main>
        <div className="register">
          <h2 className="register__title">Регистрация</h2>
          <form className="register__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="register__input"
              placeholder="Email"
              name="email"
            value={formValue.email}
            onChange={handleChange}
              required
            />
            <input
              type="password"
              className="register__input"
              placeholder="Пароль"
              name="password"
            value={formValue.password}
            onChange={handleChange}
              required
            />
            <button type="submit" className="register__submit-button">
              Зарегестрироваться
            </button>
            <p className="register__text">Уже зарегистрированы? <Link className="register__link" to="/sign-in">Войти</Link></p>
          </form>
        </div>
      </main>
    </>
)

}