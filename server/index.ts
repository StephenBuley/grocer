import * as dotenv from 'dotenv'
dotenv.config()

import express from "express";
import process from "process";
import bodyParser from 'body-parser';
import cors from "cors";
import mongoose from 'mongoose';
import UserModel from './Schemas/UserSchema';

const uri = `mongodb+srv://StephenBuleyDB:${process.env.DB_PASSWORD}@cluster0.4kodetu.mongodb.net/grocer?retryWrites=true&w=majority`;
main().catch(err => console.error(err)) // top level async await functionality
async function main() {
    await mongoose.connect(uri) // asynchronously connects to database

    // const testUser = new UserModel({          this is an example of creating and saving
    //                                              a new user
    //     username: "Test Number " + Date.now(),
    //     password: "bob"
    // })

    // testUser.save()

    const PORT = process.env.PORT
    
    const app = express()
    app.use(cors()) // change these options when deploying to only allow your frontend to 
    //                  communicate with your backend
    app.use(bodyParser.json()); // backend accepts and sends json
    
    app.get("/", (req, res) => {
        res.json({string: "hello from the server"}) // 
    })
    
    app.listen(PORT, () => {
        console.log(`Hello there! from PORT ${PORT}`)
    })
}