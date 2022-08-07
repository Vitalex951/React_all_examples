import {createContext} from "react";


export type AuthContextType = {
    isAuth: boolean
    isLoading: boolean
    setIsAuth: (isAuth: boolean) => void
}

export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    setIsAuth: () => {},
    isLoading: true
})