import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {editProfileApi} from "../../components/api/PostsService";
import {useFetching} from "../../components/hooks/useFetching";
import {Loader} from "../../components/UI/loader/Loader";
import style from './PostIdPage.module.css';
import {MyButton} from "../../components/UI/button/MyButton";

export type PostIdType = {
    userId: number
    id: number
    title: string
    body: string
}

export type CommentsType = {
    postId: number,
    id: number,
    name: string
    email: string
    body: string
}

export const PostIdPage = () => {
    const [post, setPost] = useState<PostIdType | null>(null)
    const [comments, setComments] = useState<CommentsType[] | null>(null)

    const {id} = useParams()
    const navigate = useNavigate()
    const idNext = id && +id < 100 ? +id + 1 : null
    const idPrevious = id && +id > 1 ? +id - 1 : null

    const changeIdPreviousPost = () => {
        if (idPrevious)
            navigate(`/posts/${idPrevious}`)
    }
    const changeIdNextPost = () => {
        if (idNext)
            navigate(`/posts/${idNext}`)
    }
    const backToPagePosts = () => {
        navigate(`/posts`)
    }
    const [fetchPostById, isLoading, error] = useFetching(async () => {
            if (id) {
                const response = await editProfileApi.getPostsById(id)
                setPost(response.data)
            }
        }
    )
    const [fetchComments, isComLoading, comError] = useFetching(async () => {
            if (id) {
                const response = await editProfileApi.getCommentsByPostsById(id)
                setComments(response.data)
            }
        }
    )


    useEffect(() => {
        // @ts-ignore
        fetchPostById(id)
        // @ts-ignore
        fetchComments(id)
    }, [id])

    if (isLoading || isComLoading) {
        return <Loader/>
    }
    return (
        <div className={style.container}>
            <h1>Вы попали на страницу поста: {post && post.id}</h1>

            {post && <div className={style.title}>{post.title}
            </div>}
            <h2>Комментарии:</h2>
            <div>
                {comments && comments.map(com =>
                    <div key={com.id} className={style.comments}>
                        <h3>{com.email}</h3>
                        <div>{com.body}</div>
                    </div>)}
            </div>
            <div className={style.btns}>

                {idPrevious
                    && <MyButton onClick={changeIdPreviousPost}>
                        {idPrevious === 2 ? 'Ко' : 'К'} {idPrevious} посту
                    </MyButton>}

                <MyButton onClick={backToPagePosts}>Назад</MyButton>

                {idNext
                    && <MyButton onClick={changeIdNextPost}>
                        {idNext === 2 ? 'Ко' : 'К'} {idNext} посту
                    </MyButton>}

            </div>
        </div>
    );
};
