import React from 'react';
import {MyButton} from "../button/MyButton";
import style from './PostItem.module.css'
import {useNavigate} from "react-router-dom";


type PostItemsFromProps = {
    post: PostType
    removePost: (id: number) => void
}
export type PostType = {
    id: number
    title: string
    body: string
}


export const PostItem: React.FC<PostItemsFromProps> = ({post, removePost}) => {
    const navigate = useNavigate()

    const removePostHandler = () => {
        removePost(post.id)
    }
    return (
        <div className={style.post}>
            <div>
                <h4>
                    <span> {post.id})</span> {post.title}
                </h4>
                <div className={style.body}>
                    {post.body}
                </div>
            </div>
            <div className={style.postBtns}>
                <MyButton onClick={() => navigate(`/posts/${post.id}`)}>Открыть</MyButton>
                <MyButton onClick={removePostHandler}>Удалить</MyButton>
            </div>
        </div>
    );
};
