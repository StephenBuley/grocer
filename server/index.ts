import * as dotenv from 'dotenv'
dotenv.config()

import express from "express";
import process from "process";

const app = express()

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Hello there! from PORT ${PORT}`)
})