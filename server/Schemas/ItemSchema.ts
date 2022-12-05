import { Schema, model } from "mongoose"

export interface IItem {
  name: string
  quantity: number
  checked: boolean
}

export const ItemSchema = new Schema<IItem>({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
})

const Item = model<IItem>("Item", ItemSchema)

export default Item
