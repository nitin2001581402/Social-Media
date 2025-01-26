import express from "express";

import { Insert, Get, Delete, Update } from '../controllers/messageController.js';

const routes = express.Router()

routes.post("/insert", Insert)

routes.get("/get", Get)
routes.get("/get/:sender_id/:receiver_id", Get)

routes.delete("/delete/:id", Delete)
routes.put("/update/:id", Update)


export default routes;