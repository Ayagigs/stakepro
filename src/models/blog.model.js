import { Schema, model } from "mongoose"
import moment from "moment";

const blogSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },

    addedBy: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: () => moment().toDate(),
    },
})

const blogModel = model('blogg', blogSchema);

export default blogModel