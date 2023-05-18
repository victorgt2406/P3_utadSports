import mongoose from 'mongoose';

const dbConnect = async () => {
    const db_uri:string = process.env.DB_URI!
    mongoose.set('strictQuery', false)
    try{
        await mongoose.connect(db_uri);
        console.log('Connected to MongoDb');
    }
    catch{
        console.log('ERROR while connecting to MongoDb');
    }
}

export default dbConnect;