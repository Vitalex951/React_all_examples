import {useState} from "react";

export const useFetching = (callback: () => void) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }
    return [fetching, isLoading, error]
}