import { Schema, model } from "mongoose"

interface IUser {
  // Document Interface for Typescript
  username: string
  password: string
}

const UserSchema = new Schema<IUser>({
  // creates the MongoDB Schema
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const User = model<IUser>("User", UserSchema) // creates the MongoDB Model

export default User
