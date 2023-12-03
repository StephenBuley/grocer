import { Schema, model } from 'mongoose';
export const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        required: true,
    },
});
const Item = model('Item', ItemSchema);
export default Item;
