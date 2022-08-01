import React from 'react';
import {MyButton} from "./button/MyButton";
import '../../styles/App.css'
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
        <div className="post">
            <div className="post__content">
                <strong>{post.id}. {post.title}</strong>
                <div>
                    {post.body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => navigate(`/posts/${post.id}`)}>Открыть</MyButton>
                <MyButton onClick={removePostHandler}>Удалить</MyButton>
            </div>
        </div>
    );
};
