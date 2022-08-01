import React from "react";
import {usePagination} from "../hooks/usePagination";

type PaginationPropsType = {
    totalPages: number
    changePage: (page: number) => void
    page: number
}
export const Pagination: React.FC<PaginationPropsType> = ({totalPages, changePage, page}) => {
    const pagesArray = usePagination(totalPages)
    return <div className="page__wrapper">

        {pagesArray.map(p => {
            return <span onClick={() => changePage(p)}
                         key={Math.random()}
                         className={page === p ? 'page page__current' : 'page'}
            >
                    {p}
                </span>
        })}

    </div>
}