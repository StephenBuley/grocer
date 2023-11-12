import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    // creates the MongoDB Schema
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = model("User", UserSchema); // creates the MongoDB Model
export default User;
