import moment from 'moment';
import { Schema, model } from 'mongoose';

const supportSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        unique: true,
    }, 
    lastname: {
        type: String,
        required: true,
        unique: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
      
    },
    subject: {
        type: String,
        required: true
        
    },
     message: {
        type: String,
        required: true 
    },
    ticketCleared: {
        type: Boolean,
        default: false 
    },
    time: {
        type: Date,
        default: () => moment().toDate(),
    },
})

const Support = model('Support', supportSchema);
export default Support;