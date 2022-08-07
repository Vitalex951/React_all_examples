import React, {useContext} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import style from './Navbar.module.css'
import {MyButton} from "../UI/button/MyButton";
import {AuthContext} from "../../context/context";


export const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const navigate = useNavigate()

    const loginOut = () => {
        setIsAuth(false)
        navigate('/login')
        localStorage.removeItem('auth')
    }
    const login = () => {
        navigate('/login')
    }

    return <div className={style.navbar}>
        <nav className={style.nav}>
            <NavLink to="/about" className={navData => navData.isActive ? `${style.navbar__links} ${style.navbar__linksActive}` : style.navbar__links}>
                About
            </NavLink>
            <NavLink to="/posts" className={navData => navData.isActive ? `${style.navbar__links} ${style.navbar__linksActive}` : style.navbar__links}>
                Posts
            </NavLink>
            {isAuth && <MyButton onClick={loginOut}>Выйти</MyButton>}
            {!isAuth && <MyButton onClick={login}>Логин</MyButton>}
        </nav>
    </div>
};