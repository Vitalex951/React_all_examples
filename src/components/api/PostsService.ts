import {instance} from "./index";
import {AxiosResponse} from "axios";
import {PostType} from "../UI/PostItem/PostItem";
import {CommentsType, PostIdType} from "../../pages/PostIdPage/PostIdPage";

export const editProfileApi = {
    getPosts(limit: number = 10, page: number = 10) {
        return instance.get<{ limit: number, page: number }, AxiosResponse<PostType[]>>("/posts", {
            params: {
                _limit: limit,
                _page: page
            }
        })
    },
    getPostsById(id: string) {
        return instance.get<{ id: string }, AxiosResponse<PostIdType>>(`/posts/${id}`)
    },
    getCommentsByPostsById(id: string) {
        return instance.get<{ id: string }, AxiosResponse<CommentsType[]>>(`/posts/${id}/comments`)
    },
}
