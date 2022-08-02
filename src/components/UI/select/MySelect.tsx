import React, {ChangeEvent} from 'react';

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
        <div>
            <select value={value}
                    onChange={onChangeSelectHandler}>
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
