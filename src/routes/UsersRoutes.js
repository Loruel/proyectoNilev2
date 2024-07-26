import { Router } from "express";
import { show, create, update, destroy } from "../controller/UsersController.js"

export const usersRoutes = Router();

usersRoutes.get('/', show );

usersRoutes.post('/', create);

usersRoutes.put('/:id', update);

usersRoutes.delete('/:id', destroy);