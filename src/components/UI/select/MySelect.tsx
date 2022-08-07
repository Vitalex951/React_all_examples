import React, {ChangeEvent} from 'react';
import style from './MySelect.module.css';


type MySelectPropsType = {
    defaultValue: string
    options: OptionType[]
    value: string
    onChange: (value: string) => void
}

export type OptionType = {
    value: string
    name: string
}


export const MySelect: React.FC<MySelectPropsType> = ({options, defaultValue, value, onChange}) => {
    const onChangeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.currentTarget.value)
    }

    return (
        <div className={style.container}>
            <select value={value}
                    onChange={onChangeSelectHandler}
                    className={style.selectCss}>
                <option disabled value=''>{defaultValue}</option>
                {options.map(option =>
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                )}
            </select>
        </div>
    );
};
