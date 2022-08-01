import React, {FormEvent, useContext} from 'react';
import {MyInput} from "../components/UI/input/MyInput";
import {MyButton} from "../components/UI/button/MyButton";
import {AuthContext} from "../context/context";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const navigate = useNavigate()
    const login = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsAuth(true)
        navigate('/posts')
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Страница для авторизации </h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Введите логин"/>
                <MyInput type="password" placeholder="Введите пароль"/>
                <MyButton>Login</MyButton>
            </form>
        </div>
    );
};