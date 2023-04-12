import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import * as ApiAuth from '../utils/ApiAuth.js';
import { useState } from "react";

export default function Login({onLogin}) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  function handleChange(e) {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formValue.email || !formValue.password){
      return
    }
    ApiAuth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token){
          setFormValue({email: '', password: ''});
          onLogin();
          navigate("/", {replace: true});
        }
      })
      .catch(err => console.log(err));
  }


  return (
    <>
      <Header>

        <Link to="/sign-up" className="header__menu">Зарегистрироваться</Link>

      </Header>

      <main>
        <div className="login">
          <h2 className="login__title">Вход</h2>
          <form className="login__form" onSubmit={handleSubmit} >
            <input
              type="email"
              className="login__input"
              placeholder="Email"
              name="email"
              value={formValue.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              className="login__input"
              placeholder="Пароль"
              name="password"
              value={formValue.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="login__submit-button">
              Войти
            </button>
          </form>
        </div>
      </main>
    </>
  )

}