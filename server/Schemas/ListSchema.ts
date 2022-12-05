import { Schema, model } from "mongoose"
import { IItem, ItemSchema } from "./ItemSchema"

export interface IList {
  name: string
  items?: IItem[]
}

const ListSchema = new Schema<IList>({
  name: {
    type: String,
    required: true,
  },
  items: [ItemSchema],
})

const List = model<IList>("List", ListSchema)

export default List
