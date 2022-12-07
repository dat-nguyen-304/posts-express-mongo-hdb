import mongoose from 'mongoose';
import config from 'config';
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(db, {
            useUnifiedTopology: true
        });
    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }
}

export { connectDB };
