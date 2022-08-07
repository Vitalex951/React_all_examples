import React from 'react';
import style from './About.module.css'
import {MyButton} from "../../components/UI/button/MyButton";
import {useNavigate} from "react-router-dom";

export const About = () => {
    const navigate = useNavigate()
    const goToPagePosts = () => {
        navigate('/posts')
    }
    return (
        <div className={style.container}>
            <h1>
                В этом проекте был реализован функционал:
            </h1>
            <div>
                <ul>
                    <li>Страница логинизации</li>
                    <li>Универсальные комопненты (input, button, select, modal)</li>
                    <li>Сортировку</li>
                    <li>Фильтрация</li>
                    <li>Кастомные хуки</li>
                    <li>Работа с глобальные / локальными данными</li>
                    <li>Постраничная пагинация / Динамическая пагинация</li>
                    <li>Запросы на сервер и обработку результатов</li>
                    <li>Компонент Loader</li>
                    <li>Навигация при помощи Rect Router Dom</li>
                    <li>Мемоизация / Кеширование</li>
                    <li>Управляемый / Неуправляемый компонент </li>
                    <li>Обработку ошибок</li>
                </ul>
            </div>
            <MyButton onClick={goToPagePosts}> Перейти к странице Постов</MyButton>
        </div>

    );
};