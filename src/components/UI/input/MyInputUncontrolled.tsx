import React, {ChangeEvent, RefObject} from "react";
import style from "./MyInput.module.css";

type MyInputUncontrolledPropsType = {
    type?: string
    placeholder?: string
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    ref?: RefObject<HTMLInputElement>
}
export const MyInputUncontrolled = React.forwardRef<HTMLInputElement, MyInputUncontrolledPropsType>((props, ref) => {
    return (
        <input ref={ref} className={style.myInput} {...props}/>
    );
});