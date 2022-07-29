import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import './styles/App.css'
import {PostType} from "./components/UI/PostItem";
import {PostList} from "./components/UI/PostList";
import {PostForm} from "./components/UI/PostForm";
import {MySelect} from "./components/UI/select/MySelect";
import {MyInput} from "./components/UI/input/MyInput";
import {PostFilter} from "./components/UI/PostFilter";
import {MyModal} from "./components/UI/modal/MyModal";
import {MyButton} from "./components/UI/button/MyButton";
import {usePosts} from "./components/hooks/usePost";
import axios from "axios";
import {editProfileApi} from "./components/api/PostsService";
import {Loader} from "./components/UI/loader/Loader";
import {useFetching} from "./components/hooks/useFetching";
import {log} from "util";
import {getPageCount} from "./components/utils/pages";
import {usePagination} from "./components/hooks/usePagination";

export type FilterType = {
    sort: string
    query: string
}

function App() {
    const [posts, setPosts] = useState<PostType[]>([])
    const [filter, setFilter] = useState<FilterType>({sort: '', query: ''})
    const [modal, setModal] = useState<boolean>(false)

    const [totalPage, setTotalPage] = useState<number>(0)
    const [limit, setlimit] = useState<number>(10)
    const [page, setPage] = useState<number>(1)

    const pagesArray = usePagination(totalPage)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const posts = await editProfileApi.getPosts(limit, totalPage)
        if (posts) {
            setPosts(posts.data)
            const totalCount = Number(posts.headers['x-total-count'])
            setTotalPage(getPageCount(totalCount, limit))
        }
    })

    console.log(totalPage)

    useEffect(() => {
        // @ts-ignore
        fetchPosts()
    }, [])

    //buttons
    const createPost = (newPost: PostType) => {
        setPosts([
            ...posts,
            {...newPost}
        ])
        setModal(false)
    }
    const removePost = (id: number) => {
        setPosts(posts.filter(post => post.id !== id))
    }
    const showModalHandler = () => {
        setModal(true)
    }

    // const bodyInputRef = useRef<HTMLInputElement>(null)

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={showModalHandler}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm createPost={createPost}/>
            </MyModal>

            <hr style={{margin: '15px'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError && <h1>postError</h1>}
            {isPostsLoading
                ? <div style={{display: "flex", justifyContent: 'center', marginTop: 50}}>
                    <Loader/>
                </div>
                : <PostList
                    posts={sortedAndSearchedPosts}
                    title={'Посты про JS'}
                    removePost={removePost}/>
            }
            <div className="page__wrapper">

                {pagesArray.map(p => {
                   return <span onClick={()=> setPage(p)}
                                key={Math.random()}
                          className={page === p ? 'page page__current' : 'page'}
                    >
                    {p}
                </span>
                })}

            </div>
        </div>
    );
}

export default App;
