import React, {ChangeEvent} from 'react';

type MySelectPropsType = {
    defaultValue: string
    options: OptionType[]
    value: string
    sortPosts: (value: string) => void
}

type OptionType = {
    value: string
    name: string
}


export const MySelect: React.FC<MySelectPropsType> = ({options, defaultValue, value, sortPosts}) => {
    const onChangeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        sortPosts(e.currentTarget.value)
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
