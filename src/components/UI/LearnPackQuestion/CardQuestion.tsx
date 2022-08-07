import React from 'react';
import style from './CardQuestion.module.css'

type LearnPackQuestionPropsType = {
    callback: (isActive: boolean) => void
    namePack: string
}

export const CardQuestion = () => {
    return (
        <div className={style.container}>
            <div className={style.text}>
                <h2>{`Learn ""`}</h2>
            </div>
            <div className={style.textQuestion}>
                <span>Question:</span>

            </div>
            <div className={style.buttons}>
                <button  className={style.buttonCancel} > Cancel</button>
                <button className={style.buttonShow} > Show answer</button>
            </div>
        </div>
    );
};