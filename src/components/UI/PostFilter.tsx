import React, {ChangeEvent} from 'react';
import {MyInput} from "./input/MyInput";
import {MySelect, OptionType} from "./select/MySelect";
import {FilterType} from "../../pages/Posts/Posts";

type PostFilterPropsType = {
    filter: FilterType
    setFilter: (filter: FilterType) => void
    setLimit: (limit: string) => void
    limit: string
}


export const PostFilter: React.FC<PostFilterPropsType> = ({filter, setFilter, setLimit, limit}) => {
    const valueSelect = [
        {value: 'idUp', name: 'По возрастанию'},
        {value: 'idDown', name: 'По убыванию'},
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
    ]
    const optionsValue: OptionType[] = [
        {value: '5', name: '5'},
        {value: '10', name: '10'},
        {value: '25', name: '25'},
        {value: '-1', name: 'Показать все'},
    ]
    const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter({...filter, query: e.currentTarget.value})
    }
    const onChangeSelectFilter = (value: string) => {
        setFilter({...filter, sort: value})
    }
    const onChangeSelectLimit = (limit: string) => {
        setLimit(limit)
    }

    return (
        <div>
            <MyInput
                value={filter.query}
                placeholder="Поиск..."
                onChange={onChangeSearchValue}
            />
            <div>
                <MySelect value={filter.sort}
                          onChange={onChangeSelectFilter}
                          options={valueSelect}
                          defaultValue="Сортировка"
                />
                <MySelect value={limit}
                          onChange={onChangeSelectLimit}
                          options={optionsValue}
                          defaultValue='Количество элементов на странице'
                />
            </div>
        </div>
    );
};
