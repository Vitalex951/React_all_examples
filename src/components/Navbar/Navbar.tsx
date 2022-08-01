import React, {useContext} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import '../../styles/App.css'
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

    return <div className='navbar'>
        <nav>
            {isAuth && <MyButton onClick={loginOut}>Выйти</MyButton>}
            {!isAuth && <MyButton onClick={login}>Логин</MyButton>}
            <NavLink to="/about" className='navbar__links'>
                About
            </NavLink>
            <NavLink to="/posts" className='navbar__links'>
                Posts
            </NavLink>
        </nav>
    </div>
};