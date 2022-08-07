import React, {useEffect, useRef, useState} from 'react';
import '../../styles/App.css'
import {Pagination} from "../../components/UI/Pagination";
import {PostType} from "../../components/UI/PostItem/PostItem";
import {getPageCount} from "../../components/utils/pages";
import {usePosts} from "../../components/hooks/usePost";
import {PostForm} from "../../components/UI/PostForm";
import {Loader} from "../../components/UI/loader/Loader";
import {MyModal} from "../../components/UI/modal/MyModal";
import {PostList} from "../../components/UI/PostList/PostList";
import {MyButton} from "../../components/UI/button/MyButton";
import {useFetching} from "../../components/hooks/useFetching";
import {editProfileApi} from "../../components/api/PostsService";
import {PostFilter} from "../../components/UI/PostFilter";
import {useObserver} from "../../components/hooks/useObserver";


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


    useObserver(lastElement, page < totalPages, isPostsLoading, filter.query, () => {
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
        setFilter({...filter, query: ''})
    }
    const changeDynamicPagination = () => {
        setDynamicPagination(!dynamicPagination)

    }

    // const bodyInputRef = useRef<HTMLInputElement>(null)

    return (
        <div className='container'>

            <div className='block'>
                <div>
                    <MyButton style={{marginTop: 30}} onClick={showModalHandler}>
                        Создать пост
                    </MyButton>
                    <MyButton onClick={changeDynamicPagination}>
                        {dynamicPagination ? 'Постраничная пагинация' : 'Динамическая пагинация'}
                    </MyButton>
                </div>
                <MyModal visible={modal} setVisible={setModal}>
                    <PostForm createPost={createPost}/>
                </MyModal>
                <PostFilter
                    filter={filter}
                    setFilter={setFilter}
                    setLimit={setLimit}
                    limit={limit}
                />
            </div>

            <hr style={{margin: '15px'}}/>


            {postError && <h1>postError</h1>}

            {isPostsLoading && <div style={{display: "flex", justifyContent: 'center', marginTop: 50}}><Loader/></div>}
            <PostList
                posts={sortedAndSearchedPosts}
                title={'Посты про JS'}
                removePost={removePost}
            />

            {filter.query === ''
                && dynamicPagination
                && <div
                    ref={lastElement}></div>}


            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />

        </div>
    );
}
