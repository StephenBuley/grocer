import mongoose, { Schema, model } from 'mongoose'

export interface IItem {
  name: string
  checked: boolean
  _id: mongoose.Types.ObjectId
}

export const ItemSchema = new Schema<IItem>({
  name: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
})

const Item = model<IItem>('Item', ItemSchema)

export default Item
