"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const process_1 = __importDefault(require("process"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const uri = `mongodb+srv://StephenBuleyDB:${process_1.default.env.DB_PASSWORD}@cluster0.4kodetu.mongodb.net/grocer?retryWrites=true&w=majority`;
main().catch(err => console.error(err)); // top level async await functionality
async function main() {
    await mongoose_1.default.connect(uri); // asynchronously connects to database
    // const testUser = new UserModel({          this is an example of creating and saving
    //                                              a new user
    //     username: "Test Number " + Date.now(),
    //     password: "bob"
    // })
    // testUser.save()
    const PORT = process_1.default.env.PORT;
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)()); // change these options when deploying to only allow your frontend to 
    //                  communicate with your backend
    app.use(body_parser_1.default.json()); // backend accepts and sends json
    app.get("/", (req, res) => {
        res.json({ string: "hello from the server" }); // 
    });
    app.listen(PORT, () => {
        console.log(`Hello there! from PORT ${PORT}`);
    });
}
