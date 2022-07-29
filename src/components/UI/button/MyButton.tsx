import React  from 'react';
import style from './MyButton.module.css'

type MyButtonPropsType = {
    style?: React.CSSProperties
    children?: React.ReactNode
    disabled?: boolean
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

export const MyButton: React.FC<MyButtonPropsType> = ({children, ...props}) => {
    return (
        <button className={style.myBtn} {...props}>
            {children}
        </button>
    );
};
