import {Posts} from "../pages/Posts";
import {About} from "../pages/About";
import {PostIdPage} from "../pages/PostIdPage";
import {Navigate} from "react-router-dom";
import React from "react";
import {Error} from "../pages/Error";
import {Login} from "../pages/Login";

export const privateRouters = [
    {path: '/about', component: <About/>},
    {path: '/posts', component: <Posts/>},
    {path: '/posts/:id', component: <PostIdPage/>},
    {path: '*', component: <Error/>},
    {path: '/', component: <Navigate replace to="/posts"/>},
]

export const publicRouters = [
    {path: '/login', component: <Login/>},
    {path: '/*', component: <Navigate replace to="/login"/>},
]