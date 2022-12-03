"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ItemSchema_1 = require("./ItemSchema");
const ListSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    items: [ItemSchema_1.ItemSchema]
});
const ListModel = (0, mongoose_1.model)("List", ListSchema);
exports.default = ListModel;
