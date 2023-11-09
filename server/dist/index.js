"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const process_1 = __importDefault(require("process"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const ListSchema_1 = __importDefault(require("./Schemas/ListSchema"));
// import User from './Schemas/UserSchema';
const uri = `mongodb+srv://${process_1.default.env.DB_USERNAME}:${process_1.default.env.DB_PASSWORD}@cluster0.4kodetu.mongodb.net/grocer?retryWrites=true&w=majority`;
main().catch((err) => console.error(err));
// top level async await functionality
async function main() {
    //TODO: fix database connection (switching IP addresses?)
    await mongoose_1.default.connect(uri); // asynchronously connects to database
    // const testUser = new User({          //this is an example of creating and saving
    //                                           // a new user
    //     username: "Test Number " + Date.now(),
    //     password: "bob"
    // })
    // await testUser.save()
    const PORT = process_1.default.env.PORT;
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: 'http://localhost:5173',
    })); // change these options when deploying to only allow your frontend to
    //                  communicate with your backend
    app.use(body_parser_1.default.json()); // backend accepts and sends json
    app.get('/', (req, res) => {
        res.json({ string: 'hello from the server' });
    });
    app.post('/lists', async (req, res) => {
        const newList = new ListSchema_1.default({ name: req.body.name, items: [] });
        await newList.save();
        res.send(newList);
    });
    app.get('/lists', async (req, res) => {
        const lists = await ListSchema_1.default.find();
        res.send(lists);
    });
    app.delete('/lists', async (req, res) => {
        const deletedList = await ListSchema_1.default.findOneAndDelete({ _id: req.body._id });
        res.send(deletedList);
    });
    app.get('/lists/:id', (req, res) => {
        console.log('Endpoint hit!');
        res.send(`<p>${req.params.id}</p>`);
    });
    app.listen(PORT, () => {
        // starts the server listening
        console.log(`Hello there! from PORT ${PORT}`);
    });
}
