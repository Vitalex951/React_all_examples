import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {editProfileApi} from "../components/api/PostsService";
import {useFetching} from "../components/hooks/useFetching";
import {Loader} from "../components/UI/loader/Loader";

export type PostIdType = {
    userId: number
    id: number
    title: string
    body: string
}

export type CommentsType  = {
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
    }, [])

    if (isLoading || isComLoading) {
        return <Loader/>
    }
    return (
        <div>
            <h1>Вы попали на старницу поста</h1>

            {post && <div>{post.id} {post.title} </div>}
                <h1>Комментарии</h1>
            <div>
                {comments && comments.map(com =>
                <div style={{marginTop: 15}}>
                    <h5>{com.email}</h5>
                    <div>{com.body}</div>
                </div>)}
            </div>
        </div>
    );
};
