import { config } from 'dotenv';
config();
import express from 'express';
import process from 'process';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import List from './Schemas/ListSchema.js';
// import User from './Schemas/UserSchema';
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.4kodetu.mongodb.net/grocer?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
main().catch((err) => console.error(err));
// top level async await functionality
async function main() {
    await mongoose.connect(uri); // asynchronously connects to database
    // const testUser = new User({          //this is an example of creating and saving
    //                                           // a new user
    //     username: "Test Number " + Date.now(),
    //     password: "bob"
    // })
    // await testUser.save()
    const PORT = process.env.PORT;
    const app = express();
    app.use(cors({
        origin: 'http://localhost:5173',
    })); // change these options when deploying to only allow your frontend to
    //                  communicate with your backend
    app.use(bodyParser.json()); // backend accepts and sends json
    app.get('/', (req, res) => {
        res.json({ string: 'hello from the server' });
    });
    app.post('/lists', async (req, res) => {
        const newList = new List({ name: req.body.name, items: [] });
        await newList.save();
        res.send(newList);
    });
    app.get('/lists', async (req, res) => {
        const lists = await List.find();
        res.send(lists);
    });
    app.delete('/lists', async (req, res) => {
        const deletedList = await List.findOneAndDelete({ _id: req.body._id });
        res.send(deletedList);
    });
    app.get('/lists/:id', async (req, res) => {
        console.log(req.params.id);
        const foundList = await List.findById(req.params.id);
        console.log(foundList);
        res.send(foundList);
    });
    app.listen(PORT, () => {
        // starts the server listening
        console.log(`Hello there! from PORT ${PORT}`);
    });
}
