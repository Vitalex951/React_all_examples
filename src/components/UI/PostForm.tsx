import React, {ChangeEvent, useState} from 'react';
import {MyInput} from "./input/MyInput";
import {MyButton} from "./button/MyButton";
import {PostType} from "./PostItem";


type InitialPostType = {
    title: string
    body: string
}

type PostFormPropsType = {
    createPost: (newPost: PostType) => void
}


export const PostForm: React.FC<PostFormPropsType> = ({createPost}) => {
    const [post, setPost] = useState<InitialPostType>({
        title: '',
        body: '',
    })


    //button
    const createPostHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const newPost: PostType = {id: 11, title: post.title, body: post.body}
        createPost(newPost)
        setPost({title: '', body: ''})
    }

    //input
    const changeTitlePost = (e: ChangeEvent<HTMLInputElement>) => {
        setPost({...post, title: e.currentTarget.value})
    }
    const changeBodyPost = (e: ChangeEvent<HTMLInputElement>) => {
        setPost({...post, body: e.currentTarget.value})
    }

    return (
        <form>
            {/*Управляемый компонент*/}
            <MyInput
                value={post.title}
                onChange={changeTitlePost}
                type="text"
                placeholder="Название поста"/>

            <MyInput
                value={post.body}
                onChange={changeBodyPost}
                type="text"
                placeholder="Название поста"/>

            {/*/!*Неуправляемый комопнент*!/*/}
            {/*<MyInput*/}
            {/*    ref={bodyInputRef}*/}
            {/*    type="text"*/}
            {/*    placeholder="Описание поста"*/}
            {/*/>*/}

            <MyButton onClick={createPostHandler}>Создать пост </MyButton>
        </form>
    );
};