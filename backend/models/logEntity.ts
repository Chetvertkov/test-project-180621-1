import mongoose = require("mongoose");

const logEntitySchema = new mongoose.Schema({
    _id: {type:'String'},
    timestamp: {type: "Number", default: 0},
    input_data:{},
    output_data:{type: "String", default: ""}
})

export const logEntity = mongoose.model('logEntity', logEntitySchema)