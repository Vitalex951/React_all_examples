import {useEffect, useRef} from "react";

export const useObserver = (ref: any, canLoad: boolean, isLoading: any, filter: string, callback: () => void) => {
    const observer = useRef<IntersectionObserver | null>(null)
    useEffect(() => {
        if (isLoading) return
        if (filter !== '') return
        if (observer.current) observer.current?.disconnect()
        var cb = function (entries: any) {
            if (entries[0].isIntersecting && canLoad) {
                callback()
            }
        };
        observer.current = new IntersectionObserver(cb);
        // @ts-ignore
        if (ref.current) {
            observer.current?.observe(ref.current)
        }
    }, [isLoading, filter])
}