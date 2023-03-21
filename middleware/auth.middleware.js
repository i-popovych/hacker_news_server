import jwt from "jsonwebtoken"
import config from "config"
import allowCrossDomain from "../settings/allowCrossDomain.js";
import express from "express";
const app = express();
app.use(allowCrossDomain);

export default function(req, res, next) {
    if(req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token) return res.status(401).json("token is empty");
        const decoder = jwt.verify(token, config.get('secretKey'));
        req.user = decoder;
        next()
    } catch (e) {
        return res.status(401).json("middleware" + e)
    }
}