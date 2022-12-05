"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    // creates the MongoDB Schema
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = (0, mongoose_1.model)("User", UserSchema); // creates the MongoDB Model
exports.default = User;
