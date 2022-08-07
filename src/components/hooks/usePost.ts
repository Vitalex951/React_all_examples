import {useMemo} from "react";
import {PostType} from "../UI/PostItem/PostItem";

export const useSortedPosts = (posts: PostType[], sort: string): PostType[] => {
    const sortedPosts = useMemo(() => {
        if (sort === 'title' || sort === 'body') {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
            if (sort === 'idUp') {
                return [...posts].sort((a, b) => a.id - b.id)
            }
        if (sort === 'idDown') {
            return [...posts].sort((a, b) => -b.id - a.id)
        }
        return posts
    }, [sort, posts])
    return sortedPosts
}

export const usePosts = (posts: PostType[], sort: string, query: string) => {
    const sortedPosts = useSortedPosts(posts, sort)
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts])
    return sortedAndSearchedPosts
}