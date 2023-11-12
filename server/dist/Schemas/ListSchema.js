import { Schema, model } from 'mongoose';
import { ItemSchema } from './ItemSchema.js';
const ListSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    items: [ItemSchema],
});
const List = model('List', ListSchema);
export default List;
