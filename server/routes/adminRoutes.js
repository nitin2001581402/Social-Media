import express from "express";

import { Register, Get, Delete, Update, Login } from '../controllers/adminController.js';

const routes = express.Router()

routes.post("/register", Register)
routes.post("/login", Login)

routes.get("/get", Get)
routes.delete("/delete/:id", Delete)
routes.put("/update/:id", Update)


export default routes;