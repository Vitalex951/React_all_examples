import React, {RefObject, useEffect, useRef, useState} from 'react';
import '../styles/App.css'
import {Pagination} from "../components/UI/Pagination";
import {PostType} from "../components/UI/PostItem";
import {getPageCount} from "../components/utils/pages";
import {usePosts} from "../components/hooks/usePost";
import {PostForm} from "../components/UI/PostForm";
import {Loader} from "../components/UI/loader/Loader";
import {MyModal} from "../components/UI/modal/MyModal";
import {PostList} from "../components/UI/PostList";
import {MyButton} from "../components/UI/button/MyButton";
import {useFetching} from "../components/hooks/useFetching";
import {editProfileApi} from "../components/api/PostsService";
import {PostFilter} from "../components/UI/PostFilter";
import {useObserver} from "../components/hooks/useObserver";
import {MySelect, OptionType} from "../components/UI/select/MySelect";


export type FilterType = {
    sort: string
    query: string
}

export const Posts = () => {
    const [posts, setPosts] = useState<PostType[]>([])
    const [filter, setFilter] = useState<FilterType>({sort: '', query: ''})
    const [modal, setModal] = useState<boolean>(false)
    const [totalPages, setTotalPage] = useState<number>(0)
    const [limit, setLimit] = useState<string>('10')
    const [page, setPage] = useState<number>(1)
    const [dynamicPagination, setDynamicPagination] = useState<boolean>(true)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef<HTMLDivElement | null>(null)


    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await editProfileApi.getPosts(+limit, page)
        if (posts) {
            if (dynamicPagination) {
                setPosts([...posts, ...response.data])
            } else {
                setPosts([...response.data])
            }

            const totalCount = Number(response.headers['x-total-count'])
            setTotalPage(getPageCount(totalCount, +limit))
        }
    })


    useEffect(() => {
        // @ts-ignore
        fetchPosts()
    }, [page, limit, dynamicPagination])


    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })


    const createPost = (newPost: PostType) => {
        setPosts([
            ...posts,
            {
                ...newPost,
                //нахожу последний id и продолжаю нумерацию нового поста
                id: posts[posts.length - 1].id + 1
            }
        ])
        setModal(false)
    }
    const removePost = (id: number) => {
        setPosts(posts.filter(post => post.id !== id))
    }
    const showModalHandler = () => {
        setModal(true)
    }
    const changePage = (page: number) => {
        setPage(page)
    }
    const changeDynamicPagination = () => {
        setDynamicPagination(!dynamicPagination)

    }

    //Select
    const optionsValue: OptionType[] = [
        {value: '5', name: '5'},
        {value: '10', name: '10'},
        {value: '25', name: '25'},
        {value: '-1', name: 'Показать все'},
    ]
    const onChangeSelectValueLimit = (value: string) => {
        setLimit(value)
    }


    // const bodyInputRef = useRef<HTMLInputElement>(null)

    return (
        <div>

            <MyButton style={{marginTop: 30}} onClick={showModalHandler}>
                Создать пост
            </MyButton>
            <MyButton onClick={changeDynamicPagination}>
                {dynamicPagination ? 'Обычная пагинация' : 'Динамическая пагинация'}
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm createPost={createPost}/>
            </MyModal>

            <hr style={{margin: '15px'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <MySelect
                defaultValue='Количество элементов на странице'
                options={optionsValue}
                value={limit}
                onChange={onChangeSelectValueLimit}
            />

            {postError && <h1>postError</h1>}

            {isPostsLoading && <div style={{display: "flex", justifyContent: 'center', marginTop: 50}}><Loader/></div>}
            <PostList
                posts={sortedAndSearchedPosts}
                title={'Посты про JS'}
                removePost={removePost}
            />

            {dynamicPagination && <div ref={lastElement}></div>}


            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />

        </div>
    );
}
