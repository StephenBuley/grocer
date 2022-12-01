import * as dotenv from 'dotenv'
dotenv.config()

import express from "express";
import process from "process";
import bodyParser from 'body-parser';
import cors from "cors";

const uri = `mongodb+srv://StephenBuleyDB:${process.env.DB_PASSWORD}@cluster0.4kodetu.mongodb.net/?retryWrites=true&w=majority`;

const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({string: "hello from the server"})
})

app.listen(PORT, () => {
    console.log(`Hello there! from PORT ${PORT}`)
})