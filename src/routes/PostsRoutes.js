import { Router } from "express";
import { show, showid, create, update, destroy, showCategory, showTitle } from "../controller/PostsController.js";

export const postsRoutes = Router();

postsRoutes.get('/', show);

postsRoutes.get('/:id', showid);

postsRoutes.post('/', create);

postsRoutes.put('/:id', update);

postsRoutes.delete('/:id', destroy);

postsRoutes.get('/category/:id', showCategory);

postsRoutes.get('/title/:title', showTitle);