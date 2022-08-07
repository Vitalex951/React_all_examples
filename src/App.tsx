import React, {useEffect, useState} from 'react';
import './styles/App.css'
import {HashRouter} from "react-router-dom";
import {Navbar} from "./components/Navbar/Navbar";
import {AppRouter} from "./components/UI/AppRouter";
import {AuthContext} from "./context/context";


function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <HashRouter>
                <Navbar/>
                <AppRouter/>
            </HashRouter>
        </AuthContext.Provider>
    );
}

export default App;

