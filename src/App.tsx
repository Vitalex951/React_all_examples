import React, {ChangeEvent, useMemo, useState} from 'react';
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

export type FilterType = {
    sort: string
    query: string
}

function App() {
    const [posts, setPosts] = useState<PostType[]>([
        {id: 1, title: 'JS', body: 'Allo'},
        {id: 2, title: 'HTML', body: 'Hi'},
        {id: 3, title: 'CSS', body: 'Good Bye'},
    ])
    const [filter, setFilter] = useState<FilterType>({sort: '', query: ''})
    const [modal, setModal] = useState<boolean>(false)

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

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
            <PostList
                posts={sortedAndSearchedPosts}
                title={'Посты про JS'}
                removePost={removePost}/>
        </div>
    );
}

export default App;
