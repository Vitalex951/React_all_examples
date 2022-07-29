import React from 'react';
import {PostItem, PostType} from "./PostItem";
import {TransitionGroup, CSSTransition} from "react-transition-group";

type PostListPropsType = {
    posts: PostType[]
    title: string
    removePost: (id: number) => void
}

export const PostList: React.FC<PostListPropsType> = ({posts, title, removePost}) => {
    if (!posts.length) {
        return <h1 style={{textAlign: 'center'}}>Посты не найдены!</h1>
    }
    return (
        <div>
            <h1 style={{textAlign: "center"}}>
                {title}
            </h1>

            <TransitionGroup>

                {posts.map((el, i) =>
                    <CSSTransition
                        key={el.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem
                            number={i + 1}
                            post={el}
                            removePost={removePost}
                        />
                    </CSSTransition>
                )}

            </TransitionGroup>

        </div>
    );
};