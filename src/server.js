import mongoose from "mongoose";
import app from "./app.js";

const PORT = 3000;
const MONGO_URL = 'mongodb://127.0.0.1:27017/api_notas_clase';

try{
    await mongoose.connect(MONGO_URL);
    app.listen(PORT, ()=>{
        console.log(`API lista en http://localhost:${PORT}`);
    });
}catch(err){
    console.error('No fue posible conecatar con MongoDB: ', err.message);
    process.exit(1);
}
