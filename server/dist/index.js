import { config } from 'dotenv';
config();
import express from 'express';
import process from 'process';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import List from './Schemas/ListSchema.js';
import Item from './Schemas/ItemSchema.js';
// import User from './Schemas/UserSchema';
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.4kodetu.mongodb.net/grocer?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
main().catch((err) => console.error(err));
// top level async await functionality
async function main() {
    try {
        await mongoose.connect(uri); // asynchronously connects to database
        console.log('successfully connected to database!');
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            console.log("Your ip address probably isn't configured in MongoDB correctly");
        }
        else {
            console.error(e);
        }
    }
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
        const foundList = await List.findById(req.params.id);
        res.send(foundList);
    });
    app.post('/lists/:id', async (req, res) => {
        const newItem = new Item(req.body.newItem);
        await newItem.save();
        const list = await List.findById(req.params.id);
        if (list !== null) {
            await List.updateOne({ _id: req.params.id }, { items: [...list.items, newItem] });
        }
        const newList = await List.findById(req.params.id);
        res.send(newList);
    });
    app.put('/lists/:id/:itemId', async (req, res) => {
        const item = await Item.findByIdAndUpdate(req.params.itemId, {
            checked: req.body.checked,
        }, { returnDocument: 'after' });
        console.log(item);
        const list = await List.findById(req.params.id);
        list.items = list.items.map((listItem) => {
            if (listItem._id.equals(item._id)) {
                return item;
            }
            else {
                return listItem;
            }
        });
        await list.save();
        res.send(list);
    });
    app.listen(PORT, () => {
        // starts the server listening
        console.log(`Hello there! from PORT ${PORT}`);
    });
}
