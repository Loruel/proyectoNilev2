import { Router } from "express";
import { show, create, update, destroy, showCategory, showTitle } from "../controller/PostsController.js";

export const postsRoutes = Router();

postsRoutes.get('/', show);

postsRoutes.post('/', create);

postsRoutes.put('/:id', update);

postsRoutes.delete('/:id', destroy);

postsRoutes.get('/category/:id', showCategory);

postsRoutes.get('/title/:title', showTitle);