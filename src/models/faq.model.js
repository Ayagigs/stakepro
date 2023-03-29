import { Schema, model } from "mongoose"
import moment from "moment";

const faqSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
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

const faqModel = model('Faqs', faqSchema);

export default faqModel