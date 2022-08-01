import React, {ChangeEvent} from 'react';
import {MyInput} from "./input/MyInput";
import {MySelect} from "./select/MySelect";
import {FilterType} from "../../pages/Posts";

type PostFilterPropsType = {
    filter: FilterType
    setFilter: (filter: FilterType) => void
}


export const PostFilter: React.FC<PostFilterPropsType> = ({filter, setFilter}) => {
    const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter({...filter, query: e.currentTarget.value})
    }
    const onChangeSelectValue = (value: string) => {
        setFilter({...filter, sort: value})
    }

    return (
        <div>
            <MyInput
                value={filter.query}
                placeholder="Поиск..."
                onChange={onChangeSearchValue}
            />
            <MySelect value={filter.sort}
                      sortPosts={onChangeSelectValue}
                      options={[
                          {value: 'title', name: 'По названию'},
                          {value: 'body', name: 'По описанию'},
                      ]}
                      defaultValue="Сортировка"
            />
        </div>
    );
};
