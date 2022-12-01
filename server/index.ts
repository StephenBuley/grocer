import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
dotenv.config()

import express from "express";
import process from "process";
const PORT = process.env.PORT

const app = express()
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({string: "hello from the server"})
})

app.listen(PORT, () => {
    console.log(`Hello there! from PORT ${PORT}`)
})