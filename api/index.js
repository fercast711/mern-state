import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'

const app = express();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('conection successfully')
})

app.listen(3000, () => {
        console.log('listening on port 3000!!');
    }
);