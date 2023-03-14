import mongoose from "mongoose";

const dbConnect = async ()=> {
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('you are connected successfuly');
    }catch(error) {
        console.log(error.message);
        process.exit(1);
    }
}

export default dbConnect;