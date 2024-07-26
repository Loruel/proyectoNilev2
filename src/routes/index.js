import { Router } from "express";
import { usersRoutes } from "./usersroutes.js";
import { postsRoutes } from "./PostsRoutes.js";
import { categorysRoutes } from "./CategorysRoutes.js";
import { comentsRoutes } from "./ComentsRoutes.js";
import { docRouter } from "./DocRoutes.js";

const API_router = Router();

export const router = (app) => {
    app.use('/api/v1', API_router);

    API_router.use('/user', usersRoutes);
    API_router.use('/category', categorysRoutes);
    API_router.use('/post', postsRoutes);
    API_router.use('/coment', comentsRoutes);
    API_router.use('/docs', docRouter);
};