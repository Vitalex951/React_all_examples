import React from 'react';
import {PostItem, PostType} from "../PostItem/PostItem";
import style from './PostList.module.css'
import {TransitionGroup, CSSTransition} from "react-transition-group";

type PostListPropsType = {
    posts: PostType[]
    title: string
    removePost: (id: number) => void
}

export const PostList: React.FC<PostListPropsType> = ({posts, title, removePost}) => {
    if (!posts.length) {
        return <h1 className={style.title}>Посты не найдены!</h1>
    }
    return (
        <div>
            <h1 className={style.title}>
                {title}
            </h1>
            <TransitionGroup>
                {posts.map(el =>
                    <CSSTransition
                        key={el.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem
                            post={el}
                            removePost={removePost}
                        />
                    </CSSTransition>
                )}
            </TransitionGroup>

        </div>
    );
};