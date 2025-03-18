import express from "express";
import aulas from "./aulasRoutes.js";
import usuarios from "./usuariosRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Escola AVANÇO!"));
    app.use(express.json(), aulas, usuarios); //middleware usado p ter acesso às requisições e respostas e agir sobre elas, parseador p JSON
};

export default routes;