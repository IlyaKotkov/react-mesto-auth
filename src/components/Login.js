import Header from "./Header";
import { Link } from "react-router-dom";

export default function Login() {

return (
    <>
    <Header>
      
        <Link to="/sign-up" className="header__menu">Регистрация</Link>
        
    </Header>

    <main>
        <div className="login">
          <h2 className="login__title">Вход</h2>
          <form className="login__form" >
            <input
              type="email"
              className="login__input"
              placeholder="Email"
              name="email"
            //   value={inputs.email}
            //   onChange={handleChange}
              required
            />
            <input
              type="password"
              className="login__input"
              placeholder="Пароль"
              name="password"
            //   value={inputs.password}
            //   onChange={handleChange}
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