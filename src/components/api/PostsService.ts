import {instance} from "./index";
import {AxiosResponse} from "axios";
import {PostType} from "../UI/PostItem";

export const editProfileApi = {
    async getPosts(limit: number = 10, page: number = 10) {
        const response = await instance.get<{ id: string }, AxiosResponse<PostType[]>>("/posts", {
            params: {
                _limit: limit,
                _page: page
            }
        })
        return response
    }
}
