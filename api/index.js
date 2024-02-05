import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import { errorHandler } from './middleware/errors.middleware.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('conection successfully')
})

app.listen(3000, () => {
        console.log('listening on port 3000!!');
    }
);

app.use(cookieParser())
app.use(cors())
app.use(express.json());
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use(errorHandler)