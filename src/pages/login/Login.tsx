import React, {FormEvent, useContext} from 'react';
import {MyInput} from "../../components/UI/input/MyInput";
import {MyButton} from "../../components/UI/button/MyButton";
import {AuthContext} from "../../context/context";
import {useNavigate} from "react-router-dom";
import style from './Login.module.css'

export const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const navigate = useNavigate()
    const login = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsAuth(true)
        navigate('/about')
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <div className={style.container}>
                <h1>Страница для авторизации </h1>
                <form onSubmit={login} className={style.block}>
                    <MyInput type="text" placeholder="Введите логин" value={'admin@admin'}/>
                    <MyInput type="password" placeholder="Введите пароль" value={'admin@admin'}/>
                    <MyButton>Login</MyButton>
                </form>
            </div>
        </div>
    );
};