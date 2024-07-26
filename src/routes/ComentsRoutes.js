import { Router } from "express";
import { create, update, destroy } from "../controller/ComentsController.js";

export const comentsRoutes = Router();

comentsRoutes.post('/', create);

comentsRoutes.put('/:id', update);

comentsRoutes.delete('/:id', destroy);