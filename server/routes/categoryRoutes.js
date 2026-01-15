import express from "express";

import { Insert, Get, Delete, Update } from '../controllers/categoryController.js';

const routes = express.Router()

routes.post("/insert", Insert)

routes.get("/get", Get)
routes.delete("/delete/:id", Delete)
routes.put("/update/:id", Update)


export default routes;