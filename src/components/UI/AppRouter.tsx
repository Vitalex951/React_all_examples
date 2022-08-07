import React, {useContext, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRouters, publicRouters} from "../../router/router";
import {AuthContext, AuthContextType} from "../../context/context";
import {Loader} from "./loader/Loader";


export const AppRouter = () => {
    const {isAuth, isLoading} = useContext<AuthContextType>(AuthContext)

    if (isLoading) {
        return  <Loader/>
    }

    return (
        <Routes>
            {isAuth
                ? privateRouters.map((el, i) => <Route key={i} path={el.path} element={el.component}/>)
                : publicRouters.map((el, i) => <Route key={i} path={el.path} element={el.component}/>)
            }
        </Routes>
    );
};
