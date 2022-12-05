"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ItemSchema = new mongoose_1.Schema({
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
});
const Item = (0, mongoose_1.model)("Item", exports.ItemSchema);
exports.default = Item;
