import React, {ChangeEvent, RefObject} from 'react';
import style from './MyInput.module.css'

type MyInputPropsType = {
    type?: string
    placeholder?: string
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    ref?: RefObject<HTMLInputElement>
}

export const MyInput = React.forwardRef<HTMLInputElement, MyInputPropsType>((props, ref) => {
    return (
        <input ref={ref} className={style.myInput} {...props}/>
    );
});


