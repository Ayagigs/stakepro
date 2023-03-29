import moment from 'moment';
import { Schema, model } from 'mongoose';

const newsLetterSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    time: {
        type: Date,
        default: () => moment().toDate(),
    },
})

const News = model('News', newsLetterSchema);
export default News;