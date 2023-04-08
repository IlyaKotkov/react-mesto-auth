import Header from "./Header";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

return (
    <>
    <Header>
      
        <Link to="/sign-in" className="header__menu">Войти</Link>
        
    </Header>

    <main>
        <div className="register">
          <h2 className="register__title">Регистрация</h2>
          <form className="register__form" >
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