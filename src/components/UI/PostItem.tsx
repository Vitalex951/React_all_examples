import React from 'react';
import {MyButton} from "./button/MyButton";
import '../../styles/App.css'

type PostItemsFromProps = {
    post: PostType
    number: number
    removePost: (id: number) => void
}
export type PostType = {
    id: number
    title: string
    body: string
}


export const PostItem: React.FC<PostItemsFromProps> = ({post, number, removePost}) => {
    const removePostHandler = () => {
        removePost(post.id)
    }
    return (
        <div className="post">
            <div className="post__content">
                <strong>{number}. {post.title}</strong>
                <div>
                    {post.body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={removePostHandler}>Удалить</MyButton>
            </div>
        </div>
    );
};
