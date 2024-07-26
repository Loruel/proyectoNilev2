import { Router } from "express";
import { create, show, update, destroy } from "../controller/CategorysController.js";

export const categorysRoutes = Router();

categorysRoutes.get('/', show);

categorysRoutes.post('/', create);

categorysRoutes.put('/:id', update);

categorysRoutes.delete('/:id', destroy);